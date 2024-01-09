from flask import Flask, request, jsonify
from nanonets import NANONETSOCR
import pandas as pd
model = NANONETSOCR()
import os

import csv

# Authenticate
model.set_token('7a01318e-7a32-11ee-b844-fed160b8e099')

import json
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
        # pred_json = model.convert_to_txt('./saved/'+pdf_file.filename)  # Assuming 'convert_to_prediction' method requires a file path
            model.convert_to_txt('./saved/'+pdf_file.filename, output_file_name="./output.txt", formatting="lines")

        text = ""
        with open('./output.txt') as f:
            text = f.read()

        print(text)

        lines = []
        csv_text = ""
        transactions=[]

        model.convert_to_csv('./saved/'+pdf_file.filename,"./output.csv")
        # df=pd.read_csv('./output.csv')
        # print(df)
        with open('./output.csv') as f:
            reader = csv.reader(f)
            lines = list(reader)

            for line in lines:
                for word in line:
                    csv_text += word + " "

        # print(csv_text)
        df=pd.read_csv('./output.csv')
        
        transaction_df=df[df.iloc[:, -1].notna() & (df.count(axis=1) >= 4) ]
        transaction_df.iloc[0] = transaction_df.iloc[0].str.lower()

        # matching_columns = transaction_df.eq('description')|(transaction_df.eq('details') | transaction_df.eq('remarks'))|(transaction_df.eq('particulars') | transaction_df.eq('purpose'))|(transaction_df.eq('transactional information') | transaction_df.eq('details of transaction'))|(transaction_df.eq('transaction particulars') | transaction_df.eq('comments'))|(transaction_df.eq('description') | transaction_df.eq('payment details'))
        # matching_column_label = matching_columns.index[matching_columns].tolist()
        keywords = ['description', 'details', 'remarks', 'particulars', 'purpose',
                    'transactional information', 'details of transaction',
                    'transaction particulars', 'comments', 'payment details']

        # Check if any keyword is present in the first row of each column
        matching_columns_first_row = transaction_df.iloc[0].apply(lambda cell: any(keyword in cell.lower() for keyword in keywords))

        # Find column labels where at least one match is found
        matching_column_label = matching_columns_first_row.index[matching_columns_first_row].tolist()

        description_column = transaction_df[matching_column_label]

        selected_columns = transaction_df.iloc[:, [0,-3,-2,-1]] 
        
        result_df = pd.concat([selected_columns, description_column], axis=1)


        df_without_balance =result_df[result_df.iloc[:, -2] != 'balance']


        array_representation = df_without_balance.values

        return jsonify(array_representation.tolist())
    
    else:
        return jsonify({'error': 'No PDF file received'})

if __name__ == '__main__':
    app.run( debug=True ,port=7000)

