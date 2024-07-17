# Project M

This project is designed to parse bank transaction SMS and bank statements, transforming them into structured and useful data for further analysis and statistical insights. By automating the extraction of key financial information, this tool simplifies personal finance management and facilitates more informed decision-making. Additionally, the project includes a Flutter-based login interface with Firebase support for secure and seamless user authentication.


## Features

- SMS Parsing: Extract transaction details from bank SMS notifications.
- Statement Parsing: Process bank statements in various formats (PDF, CSV, etc.).
- Data Normalization: Standardize extracted information.
- Categorization: Classify transactions for meaningful insights.
- Visualization: Generate reports and visualizations of spending patterns.
- Flutter Interface: User-friendly login interface built with Flutter, supported by Firebase for authentication.


## Installation

1. Clone the Repository:

```bash
  git clone https://github.com/Parth-Jain-2002/Project-M.git
  cd Project-M

```
2. Install dependencies for the specific components (e.g., Node.js for the SMS parser).
    
## Usage
- Installation
```javascript
  npm install transaction-sms-parser
```
- How to Use
```javascript
import { getTransactionInfo } from 'transaction-sms-parser';

const sms = 'INR 2000 debited from A/c no. XX3423 on 05-02-19 07:27:11 IST at ECS PAY. Avl Bal- INR 2343.23.';
const transactionInfo = getTransactionInfo(sms);

// Output
{
  account: {
    type: 'ACCOUNT',
    number: '3423',
    name: null,
  },
  balance: { available: '2343.23', outstanding: null },
  transaction: {
    type: 'debit',
    amount: '2343.23',
    referenceNo: null,
    merchant: null,
  }
}

```
* Place your bank statements in the designated directory.
* Run the parser script to extract data.

## Report Generation
Run the report generation script to create statistical reports and visualizations.
