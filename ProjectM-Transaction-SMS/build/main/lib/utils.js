"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextWords = exports.padCurrencyValue = exports.getProcessedMessage = exports.processMessage = exports.extractBondedAccountNo = exports.trimLeadingAndTrailingChars = exports.isNumber = void 0;
const constants_1 = require("./constants");
const isNumber = (val) => !Number.isNaN(Number(val));
exports.isNumber = isNumber;
const trimLeadingAndTrailingChars = (str) => {
    const [first, last] = [str[0], str[str.length - 1]];
    let finalStr = Number.isNaN(Number(last)) ? str.slice(0, -1) : str;
    finalStr = Number.isNaN(Number(first)) ? finalStr.slice(1) : finalStr;
    return finalStr;
};
exports.trimLeadingAndTrailingChars = trimLeadingAndTrailingChars;
const extractBondedAccountNo = (accountNo) => {
    const strippedAccountNo = accountNo.replace('ac', '');
    return Number.isNaN(Number(strippedAccountNo)) ? '' : strippedAccountNo;
};
exports.extractBondedAccountNo = extractBondedAccountNo;
//This function returns array of words in a messagestring(input string) with few modifications in the word.
const processMessage = (message) => {
    // convert to lower case
    let messageStr = message.toLowerCase();
    // remove '-'
    messageStr = messageStr.replace(/-/g, '');
    // remove '!'
    messageStr = messageStr.replace(/!/g, '');
    // remove ':'
    messageStr = messageStr.replace(/:/g, ' ');
    // remove '='
    messageStr = messageStr.replace(/=/g, ' ');
    // remove '{}'
    messageStr = messageStr.replace(/[{}]/g, ' ');
    // remove \n
    messageStr = messageStr.replace(/\n/g, ' ');
    // remove \r
    messageStr = messageStr.replace(/\r/g, ' ');
    // remove 'ending'
    messageStr = messageStr.replace(/ending /g, '');
    // replace 'x'
    messageStr = messageStr.replace(/x|[*]/g, '');
    // // remove 'is' 'with'
    // message = message.replace(/\bis\b|\bwith\b/g, '');
    // replace 'is'
    messageStr = messageStr.replace(/is /g, '');
    // replace 'with'
    messageStr = messageStr.replace(/with /g, '');
    // remove 'no.'
    messageStr = messageStr.replace(/no. /g, '');
    // replace all ac,a/c,acct, account with ac
    messageStr = messageStr.replace(/\bac\b|\ba\/c\b|\bacct\b|\baccount\b/g, 'ac');
    // remove '/'
    messageStr = messageStr.replace(/\//g, ' ');
    // replace all 'rs' with 'rs. '
    messageStr = messageStr.replace(/rs(?=\w)/g, 'rs. ');
    // replace all 'rs ' with 'rs. '
    messageStr = messageStr.replace(/rs /g, 'rs. ');
    // replace all inr with rs.
    messageStr = messageStr.replace(/inr(?=\w)/g, 'rs. ');
    //
    messageStr = messageStr.replace(/inr /g, 'rs. ');
    // replace all 'rs. ' with 'rs.'
    messageStr = messageStr.replace(/rs. /g, 'rs.');
    // replace all 'rs.' with 'rs. '
    messageStr = messageStr.replace(/rs.(?=\w)/g, 'rs. ');
    // replace all 'debited' with ' debited '
    messageStr = messageStr.replace(/debited/g, ' debited ');
    // replace all 'credited' with ' credited '
    messageStr = messageStr.replace(/credited/g, ' credited ');
    // combine words
    constants_1.combinedWords.forEach((word) => {
        messageStr = messageStr.replace(word.regex, word.word);
    });
    return messageStr.split(' ').filter((str) => str !== '');
};
exports.processMessage = processMessage;
//It ensures message is processed using processmessage() function only if the input is a string. Else returns as it is. 
const getProcessedMessage = (message) => {
    let processedMessage = [];
    if (typeof message === 'string') {
        processedMessage = (0, exports.processMessage)(message);
    }
    else {
        processedMessage = message;
    }
    return processedMessage;
};
exports.getProcessedMessage = getProcessedMessage;
//It ensures there are atleast 2 zeroes at the end of the currency value.
const padCurrencyValue = (val) => {
    const [lhs, rhs] = val.split('.');
    return `${lhs}.${(rhs !== null && rhs !== void 0 ? rhs : '').padEnd(2, '0')}`;
};
exports.padCurrencyValue = padCurrencyValue;
const getNextWords = (source, searchWord, count = 1) => {
    // const splitRegex = new RegExp(`[^0-9a-zA-Z]${searchWord}[^0-9a-zA-Z]+`, 'gi');
    const splits = source.split(searchWord, 2);
    const nextGroup = splits[1];
    if (nextGroup) {
        const wordSplitRegex = /[^0-9a-zA-Z]+/gi;
        return nextGroup.trim().split(wordSplitRegex, count).join(' ');
    }
    return '';
};
exports.getNextWords = getNextWords;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUE0QztBQUdyQyxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQS9DLFFBQUEsUUFBUSxZQUF1QztBQUVyRCxNQUFNLDJCQUEyQixHQUFHLENBQUMsR0FBVyxFQUFVLEVBQUU7SUFDakUsTUFBTSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUNuRSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBRXRFLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUMsQ0FBQztBQVBXLFFBQUEsMkJBQTJCLCtCQU90QztBQUVLLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxTQUFpQixFQUFVLEVBQUU7SUFDbEUsTUFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFB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