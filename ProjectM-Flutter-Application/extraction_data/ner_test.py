import spacy

nlp = spacy.load("en_core_web_sm")

text = "We have credited your ICICI Bank Account XX499 with INR 12,500.00 on 03-Jul-23. Info:INF*INFT*032775256931*Isthar. The Available Balance is INR 57,145.35."

doc = nlp(text)

entity_name = ""
transaction_amount = ""
transaction_date = ""

for ent in doc.ents:
    if ent.label_ == "PERSON":
        entity_name = ent.text
    elif ent.label_ == "MONEY":
        transaction_amount = ent.text
    elif ent.label_ == "DATE":
        transaction_date = ent.text

print("Entity name:", entity_name)
print("Transaction amount:", transaction_amount)
print("Transaction date:", transaction_date)