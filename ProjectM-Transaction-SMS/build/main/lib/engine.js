"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionInfo = exports.getTransactionType = exports.getTransactionAmount = void 0;
const account_1 = __importDefault(require("./account"));
const balance_1 = __importDefault(require("./balance"));
const interface_1 = require("./interface");
const merchant_1 = __importDefault(require("./merchant"));
const utils_1 = require("./utils");
const getTransactionAmount = (message) => {
    const processedMessage = (0, utils_1.getProcessedMessage)(message);
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
        money = money === null || money === void 0 ? void 0 : money.replace(/,/g, '');
        // If this is also false positive, return ""
        // Else return the found money
        if (Number.isNaN(Number(money))) {
            return '';
        }
        return (0, utils_1.padCurrencyValue)(money);
    }
    return (0, utils_1.padCurrencyValue)(money);
};
exports.getTransactionAmount = getTransactionAmount;
const getTransactionType = (message) => {
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
exports.getTransactionType = getTransactionType;
const getTransactionInfo = (message) => {
    if (!message || typeof message !== 'string') {
        return {
            account: {
                type: interface_1.IAccountType.ACCOUNT,
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
    const processedMessage = (0, utils_1.processMessage)(message);
    0;
    const account = (0, account_1.default)(processedMessage);
    const availableBalance = (0, balance_1.default)(processedMessage, interface_1.IBalanceKeyWordsType.AVAILABLE);
    const transactionAmount = (0, exports.getTransactionAmount)(processedMessage);
    const isValid = [availableBalance, transactionAmount, account.number].filter((x) => x !== '').length >= 2;
    const transactionType = isValid ? (0, exports.getTransactionType)(processedMessage) : null;
    const balance = { available: availableBalance, outstanding: null };
    if (account && account.type === interface_1.IAccountType.CARD) {
        balance.outstanding = (0, balance_1.default)(processedMessage, interface_1.IBalanceKeyWordsType.OUTSTANDING);
    }
    const { merchantName, transactionId } = (0, merchant_1.default)(message);
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
exports.getTransactionInfo = getTransactionInfo;
const sms = 
// 'INR 2000 debited from A/c no. XX3423 on 05-02-19 07:27:11 IST at ECS PAY. Avl Bal- INR 2343.23.';
// 'Money Transfer:Rs 205.00 from HDFC Bank A/c **1234 on 05-01-24 to BHOPAL CATERRERS UPI: 400541945616 Not you? Call 18002586161';
// 'ICICI Bank Account XX786 credited:Rs. 1,82,951.79 on 05-Jan-24. Info NEFT-AXISCN0471404976-AXIS M. Available Balance is Rs. 2,09,818.75.';
// 'Dear UPI user A/C X2037 debited by Rs 75.0 on date 24Nov23 trf to BHOPAL CATERRERS Refno 332888663806. If not u? call 1800111109. -SBI';
// 'Dear UPI Yash X2037 debited by rs 130.0 on date 03Dec23 trf to KANAKAFOODMANAGE Refno 333708447173. If not u? call 1800111109. -SBI';
'Dear UPI user A/C X2037 debited by 130.0 on date 04Jan24 trf to PaytmUser Refno 400457379679. If not u? call 1800111109. -SBI';
const transactionInfo = (0, exports.getTransactionInfo)(sms);
console.log(transactionInfo);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9lbmdpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0RBQW1DO0FBQ25DLHdEQUFtQztBQUNuQywyQ0FPcUI7QUFDckIsMERBQTZDO0FBQzdDLG1DQUFnRjtBQUV6RSxNQUFNLG9CQUFvQixHQUFHLENBQUMsT0FBcUIsRUFBVSxFQUFFO0lBQ3BFLE1BQU0sZ0JBQWdCLEdBQUcsSUFBQSwyQkFBbUIsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUN0RCxJQUFJLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFNUMsMEJBQTBCO0lBQzFCLFlBQVk7SUFDWixJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNoQixJQUFJLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsSUFBSSxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELElBQUksVUFBVSxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQ3BCLEtBQUssR0FBRyxVQUFVLENBQUM7U0FDcEI7YUFDSSxJQUFJLFdBQVcsSUFBSSxDQUFDLENBQUMsRUFBRTtZQUMxQixLQUFLLEdBQUcsV0FBVyxDQUFDO1NBQ3JCO2FBQ0k7WUFDSCxPQUFPLEVBQUUsQ0FBQztTQUNYO0tBQ0Y7SUFHRCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRS9CLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUVoQyw0QkFBNEI7SUFDNUIsaURBQWlEO0lBQ2pELDhCQUE4QjtJQUM5QixJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7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