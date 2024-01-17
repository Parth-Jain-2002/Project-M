import { combinedWords } from './constants';
export const isNumber = (val) => !Number.isNaN(Number(val));
export const trimLeadingAndTrailingChars = (str) => {
    const [first, last] = [str[0], str[str.length - 1]];
    let finalStr = Number.isNaN(Number(last)) ? str.slice(0, -1) : str;
    finalStr = Number.isNaN(Number(first)) ? finalStr.slice(1) : finalStr;
    return finalStr;
};
export const extractBondedAccountNo = (accountNo) => {
    const strippedAccountNo = accountNo.replace('ac', '');
    return Number.isNaN(Number(strippedAccountNo)) ? '' : strippedAccountNo;
};
//This function returns array of words in a messagestring(input string) with few modifications in the word.
export const processMessage = (message) => {
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
    combinedWords.forEach((word) => {
        messageStr = messageStr.replace(word.regex, word.word);
    });
    return messageStr.split(' ').filter((str) => str !== '');
};
//It ensures message is processed using processmessage() function only if the input is a string. Else returns as it is. 
export const getProcessedMessage = (message) => {
    let processedMessage = [];
    if (typeof message === 'string') {
        processedMessage = processMessage(message);
    }
    else {
        processedMessage = message;
    }
    return processedMessage;
};
//It ensures there are atleast 2 zeroes at the end of the currency value.
export const padCurrencyValue = (val) => {
    const [lhs, rhs] = val.split('.');
    return `${lhs}.${(rhs ?? '').padEnd(2, '0')}`;
};
export const getNextWords = (source, searchWord, count = 1) => {
    // const splitRegex = new RegExp(`[^0-9a-zA-Z]${searchWord}[^0-9a-zA-Z]+`, 'gi');
    const splits = source.split(searchWord, 2);
    const nextGroup = splits[1];
    if (nextGroup) {
        const wordSplitRegex = /[^0-9a-zA-Z]+/gi;
        return nextGroup.trim().split(wordSplitRegex, count).join(' ');
    }
    return '';
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFHNUMsTUFBTSxDQUFDLE1BQU0sUUFBUSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFFNUQsTUFBTSxDQUFDLE1BQU0sMkJBQTJCLEdBQUcsQ0FBQyxHQUFXLEVBQVUsRUFBRTtJQUNqRSxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ25FLFFBQVEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFFdEUsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxTQUFpQixFQUFVLEVBQUU7SUFDbEUsTUFBTSxpQkFBaUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RCxPQUFPLE1BQU0sQ0FBQyxLQUFL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