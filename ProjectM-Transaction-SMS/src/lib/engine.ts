import getAccount from './account';
import getBalance from './balance';
import {
  IAccountType,
  IBalance,
  IBalanceKeyWordsType,
  ITransactionInfo,
  TMessageType,
  TTransactionType,
} from './interface';
import extractMerchantInfo from './merchant';
import { getProcessedMessage, padCurrencyValue, processMessage } from './utils';

export const getTransactionAmount = (message: TMessageType): string => {
  const processedMessage = getProcessedMessage(message);
  let index = processedMessage.indexOf('rs.');

  // If "rs." does not exist
  // Return ""
  if (index === -1) {
    let creditedInd = processedMessage.indexOf('credited');
    let debitedInd = processedMessage.indexOf('debited');
    if (debitedInd != -1) {
      index = debitedInd;
    }
    else if (creditedInd != -1) {
      index = creditedInd;
    }
    else {
      return '';
    }
  }


  let money = message[index + 1];

  money = money.replace(/,/g, '');

  // If data is false positive
  // Look ahead one index and check for valid money
  // Else return the found money
  if (Number.isNaN(Number(money))) {
    money = message[index + 2];
    money = money?.replace(/,/g, '');

    // If this is also false positive, return ""
    // Else return the found money
    if (Number.isNaN(Number(money))) {
      return '';
    }
    return padCurrencyValue(money);
  }
  return padCurrencyValue(money);
};

export const getTransactionType = (message: TMessageType): TTransactionType => {
  const creditPattern =
    /(?:credited|credit|deposited|added|received|refund|repayment)/gi;
  const debitPattern = /(?:debited|debit|deducted)/gi;
  const miscPattern =
    /(?:payment|spent|paid|used\s+at|charged|transaction\son|transaction\sfee|tran|booked|purchased|sent\s+to|purchase\s+of)/gi;

  const messageStr = typeof message !== 'string' ? message.join(' ') : message;

  if (debitPattern.test(messageStr)) {
    return 'debit';
  }
  if (creditPattern.test(messageStr)) {
    return 'credit';
  }
  if (miscPattern.test(messageStr)) {
    return 'debit';
  }

  return null;
};

export const getTransactionInfo = (message: string): ITransactionInfo => {
  if (!message || typeof message !== 'string') {
    return {
      account: {
        type: IAccountType.ACCOUNT,
        number: null,
        name: null,
      },
      transactionAmount: null,
      balance: null,
      transactionType: null,
      transactionId: null,
      merchantName: null,
    };
  }

  const processedMessage = processMessage(message); 0
  const account = getAccount(processedMessage);
  const availableBalance = getBalance(
    processedMessage,
    IBalanceKeyWordsType.AVAILABLE
  );
  const transactionAmount = getTransactionAmount(processedMessage);
  const isValid =
    [availableBalance, transactionAmount, account.number].filter(
      (x) => x !== ''
    ).length >= 2;
  const transactionType = isValid ? getTransactionType(processedMessage) : null;
  const balance: IBalance = { available: availableBalance, outstanding: null };

  if (account && account.type === IAccountType.CARD) {
    balance.outstanding = getBalance(
      processedMessage,
      IBalanceKeyWordsType.OUTSTANDING
    );
  }

  const { merchantName, transactionId } = extractMerchantInfo(message);

  // console.log(processedMessage);

  // console.log(account, balance, transactionAmount, transactionType);
  // console.log('-----------------------------------------------------');
  return {
    account,
    balance,
    transactionAmount,
    transactionType,
    merchantName,
    transactionId,
  };
};
const sms =
// 'INR 2000 debited from A/c no. XX3423 on 05-02-19 07:27:11 IST at ECS PAY. Avl Bal- INR 2343.23.';
// 'Money Transfer:Rs 205.00 from HDFC Bank A/c **1234 on 05-01-24 to BHOPAL CATERRERS UPI: 400541945616 Not you? Call 18002586161';
// 'ICICI Bank Account XX786 credited:Rs. 1,82,951.79 on 05-Jan-24. Info NEFT-AXISCN0471404976-AXIS M. Available Balance is Rs. 2,09,818.75.';
// 'Dear UPI user A/C X2037 debited by Rs 75.0 on date 24Nov23 trf to BHOPAL CATERRERS Refno 332888663806. If not u? call 1800111109. -SBI';
// 'Dear UPI Yash X2037 debited by rs 130.0 on date 03Dec23 trf to KANAKAFOODMANAGE Refno 333708447173. If not u? call 1800111109. -SBI';
'Dear UPI user A/C X2037 debited by 130.0 on date 04Jan24 trf to PaytmUser Refno 400457379679. If not u? call 1800111109. -SBI';
const transactionInfo = getTransactionInfo(sms);
console.log(transactionInfo);
