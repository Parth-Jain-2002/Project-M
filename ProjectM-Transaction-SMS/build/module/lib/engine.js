import getAccount from './account';
import getBalance from './balance';
import { IAccountType, IBalanceKeyWordsType, } from './interface';
import extractMerchantInfo from './merchant';
import { getProcessedMessage, padCurrencyValue, processMessage } from './utils';
export const getTransactionAmount = (message) => {
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
export const getTransactionType = (message) => {
    const creditPattern = /(?:credited|credit|deposited|added|received|refund|repayment)/gi;
    const debitPattern = /(?:debited|debit|deducted)/gi;
    const miscPattern = /(?:payment|spent|paid|used\s+at|charged|transaction\son|transaction\sfee|tran|booked|purchased|sent\s+to|purchase\s+of)/gi;
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
export const getTransactionInfo = (message) => {
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
    const processedMessage = processMessage(message);
    0;
    const account = getAccount(processedMessage);
    const availableBalance = getBalance(processedMessage, IBalanceKeyWordsType.AVAILABLE);
    const transactionAmount = getTransactionAmount(processedMessage);
    const isValid = [availableBalance, transactionAmount, account.number].filter((x) => x !== '').length >= 2;
    const transactionType = isValid ? getTransactionType(processedMessage) : null;
    const balance = { available: availableBalance, outstanding: null };
    if (account && account.type === IAccountType.CARD) {
        balance.outstanding = getBalance(processedMessage, IBalanceKeyWordsType.OUTSTANDING);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9lbmdpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxVQUFVLE1BQU0sV0FBVyxDQUFDO0FBQ25DLE9BQU8sVUFBVSxNQUFNLFdBQVcsQ0FBQztBQUNuQyxPQUFPLEVBQ0wsWUFBWSxFQUVaLG9CQUFvQixHQUlyQixNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLG1CQUFtQixNQUFNLFlBQVksQ0FBQztBQUM3QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRWhGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLENBQUMsT0FBcUIsRUFBVSxFQUFFO0lBQ3BFLE1BQU0sZ0JBQWdCLEdBQUcsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsSUFBSSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTVDLDBCQUEwQjtJQUMxQixZQUFZO0lBQ1osSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDaEIsSUFBSSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksVUFBVSxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRCxJQUFJLFVBQVUsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUNwQixLQUFLLEdBQUcsVUFBVSxDQUFDO1NBQ3BCO2FBQ0ksSUFBSSxXQUFXLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDMUIsS0FBSyxHQUFHLFdBQVcsQ0FBQztTQUNyQjthQUNJO1lBQ0gsT0FBTyxFQUFFLENBQUM7U0FDWDtLQUNGO0lBR0QsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztJQUUvQixLQUFLLEdB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