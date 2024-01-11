from flask import Flask, request, jsonify
from nanonets import NANONETSOCR
import pandas as pd
from dotenv import load_dotenv
import os
import re
import csv
import json

load_dotenv()
model_id=os.getenv('MODEL_ID')
model = NANONETSOCR()
# Authenticate
model.set_token(model_id)

app = Flask(__name__)

@app.route('/upload_pdf', methods=['POST'])
def upload_pdf():
    
    if 'pdfFile' in request.files:
        pdf_file = request.files['pdfFile']
        upload_directory = './saved'
        if not os.path.exists(upload_directory):
            os.makedirs(upload_directory)

        if pdf_file.filename != '':
            file_path = os.path.join(upload_directory, pdf_file.filename)
            pdf_file.save(file_path)
       
            model.convert_to_txt('./saved/'+pdf_file.filename, output_file_name="./output.txt", formatting="lines")

        # converts the text in .txt to lowercase
    
        text = ""
        with open('./output.txt','r') as f:
            text = f.read()
        lowercase_content=text.lower()

        with open('./output.txt','w') as f:
            f.write(lowercase_content)

        # search the following string in csv file
        search_strings = ['a/c no', 'account no', 'account number','a/c']
        year_search_strings=['statement period','statement of account','statement date']
        found_digits=''
        start_year=''
        end_year=''

        with open('./output.txt', 'r') as file:
            
            for line_number, line in enumerate(file, start=1):
               
            #    Search for account no
                for search_string in search_strings:
                    if search_string in line:   
                        
                        match = re.search(f'{search_string}\D*(\d+)', line)
                        if match:
                            found_digits = match.group(1)
                
                # Search for start date in statement period
                for search_string in year_search_strings:
                    pattern = re.compile(fr'{search_string}.*?(\d{{4}})',re.DOTALL)
                    match = re.search(pattern, text)
                    if match:
                        start_year=match.group(1)

                # Search for end date in statement period
                pattern=re.compile(fr'{start_year+" to"}.*?(\d{{4}})',re.DOTALL)
                match=re.search(pattern,text)
                if match:          
                    end_year=match.group(1)
                  

        print(text)

        lines = []
        csv_text = ""
        transactions=[]


        model.convert_to_csv('./saved/'+pdf_file.filename,"./output.csv")
        with open('./output.csv') as f:
            reader = csv.reader(f)
            lines = list(reader)

            for line in lines:
                for word in line:
                    csv_text += word + " "

        # print(csv_text)
        df=pd.read_csv('./output.csv')
        
        # Remove the row if value in last column is null and if value in atleast 4 columns is non emmpty(date,description,withdrawal/deposit,balance)
        transaction_df=df[df.iloc[:, -1].notna() & (df.count(axis=1) >= 4) ]

        # Convert the values in first row to lowercase
        transaction_df.iloc[0] = transaction_df.iloc[0].str.lower()

        # Search for description column
        keywords = ['description', 'details', 'remarks', 'particulars', 'purpose',
                    'transactional information', 'details of transaction',
                    'transaction particulars', 'comments', 'payment details']

       
        matching_columns_first_row = transaction_df.iloc[0].apply(lambda cell: any(keyword in cell.lower() for keyword in keywords))

        matching_column_label = matching_columns_first_row.index[matching_columns_first_row].tolist()

        description_column = transaction_df[matching_column_label]
        if(transaction_df.iloc[1,0]==transaction_df.iloc[1,1]):
            selected_columns = transaction_df.iloc[:, [1,-3,-2,-1]] 
            selected_columns=selected_columns.rename(columns={'Unnamed: 1':'Unnamed: 0'})
        else:
            selected_columns = transaction_df.iloc[:, [0,-3,-2,-1]] 

        print(selected_columns.columns)

        result_df = pd.concat([selected_columns, description_column], axis=1)
        
        
        # Add the year in date column if not already present
        def add_default_year(value, default_years):
   
            match = re.search(r'\b\d{4}\b', str(value))

            if match:
                
                return value
            else:
                
                match_month = re.search(r'\b(?:January|Jan|February|Feb|March|Mar|April|Apr|May|June|July|Jul|Aug|August|Sept|September|October|Oct|November|Nov|December|Dec)\b', str(value))
                match_date=re.search(r'\b\d{2}\b',str(value))
                if match_month:
                    if match_date:
                        date=match_date.group()
                    else: 
                        date='09'
                    month = match_month.group().lower()
                    
                    default_year = default_years.get(month, '')
                    month=default_month.get(month,'')
                   
                    return f'{default_year}-{date}-{month}'
                
                else:
                    return value
        default_month={'jan': '01', 'feb': '02', 'mar': '03','apr':'04','may':'05','june':'06','jul':'07','aug':'08','sept':'09','oct':'10','nov':'11','dec':'12'}
        default_years = {'jan': end_year, 'feb': end_year, 'mar': end_year,'apr':start_year,'may':start_year,'june':start_year,'jul':start_year,'aug':start_year,'sept':start_year,'oct':start_year,'nov':start_year,'dec':start_year}

        result_df['Unnamed: 0']= result_df['Unnamed: 0'].apply(add_default_year, default_years=default_years)
        print(result_df)

        # Convert the date string value to date format
        result_df['Unnamed: 0'] = pd.to_datetime(result_df['Unnamed: 0'],format='mixed',errors='coerce')
        # Drop the row if date value is null
        result_df = result_df.dropna(subset=['Unnamed: 0'])
        # convert null values to none
        result_df = result_df.where(pd.notna(result_df), None)
        array_representation = result_df.values

        return jsonify({'transactions':array_representation.tolist(),'account_no':found_digits,'start_year':start_year,'end_year':end_year})
    
    else:
        return jsonify({'error': 'No PDF file received'})

if __name__ == '__main__':
    app.run( debug=True ,port=7000)

