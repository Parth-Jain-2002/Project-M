import pandas as pd
import re
import csv
import os

from nanonets import NANONETSOCR
model = NANONETSOCR()
model.set_token('e1db0cce-7721-11ee-86cb-eab1013a2ac4')


# Initialise
from nanonets import NANONETSOCR
model = NANONETSOCR()

# Authenticate
model.set_token('e1db0cce-7721-11ee-86cb-eab1013a2ac4')


# PDF / Image to CSV
FILE_PATH = '/content/Bank-Statement-Template-1-TemplateLab-1.pdf'
model.convert_to_csv(FILE_PATH, output_file_name = 'output.csv')

# Extracting each table in separate csv
df = pd.read_csv('output.csv')
directory = 'results'
if not os.path.exists(directory):
    os.makedirs(directory)

result = []
result = pd.DataFrame(result)
table_number = 0
table_name_pattern = r"TABLE \d+"


for idx, row in df.iterrows():
  row = row.to_frame().T
  if re.match(table_name_pattern, str(row.iloc[0,0])):
    if len(result) != 0:
      result.dropna(axis = 0, how = 'all', inplace = True)
      result.to_csv(f'./results/TABLE{table_number}.csv', index=False)
      table_number = table_number + 1
      result = []
      result = pd.DataFrame(result)
  else:
    result = pd.concat([result,row],ignore_index = True)


result.to_csv(f'./results/TABLE{table_number}.csv', index=False)