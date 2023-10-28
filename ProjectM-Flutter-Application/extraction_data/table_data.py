import tabula

def extract_table_data(pdf_file):
    """Extracts the table data from a PDF file using Tabula.

    Args:
        pdf_file (str): The path to the PDF file.

    Returns:
        list: A list of lists, where each list represents a row in the table.
    """

    try:
        table = tabula.read_pdf(pdf_file)
        table_data = []
        for row in table[0].data:
            table_data.append(row)
        return table_data
    except Exception as e:
        print(f"No data found in {pdf_file}. Error: {e}")
        return []

if __name__ == "__main__":
    pdf_file = "bank_test.pdf"
    table_data = extract_table_data(pdf_file)
    print(table_data)
