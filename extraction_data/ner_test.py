import spacy
from fner import FNER

# Load the financial NER model
nlp = spacy.load('en_core_web_sm')
fner = FNER(nlp, labels=['MONEY', 'DATE', 'CARDINAL'])

# Process the message and extract recognized financial entities
def extract_financial_entities(message):
    doc = nlp(message)
    financial_entities = fner.extract_entities(doc)
    return financial_entities

# Example usage
message = "ICICI Bank Acct XX499 debited for Rs 476.70 on 09-Jul-23; Zomato Ltd credited. UPI:355651891355."

# Extract financial entities from the message
entities = extract_financial_entities(message)

# Print the recognized financial entities
for entity in entities:
    print(f"Entity: {entity.text}, Label: {entity.label_}")
