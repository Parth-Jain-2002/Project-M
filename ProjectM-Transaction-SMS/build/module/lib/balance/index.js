import { availableBalanceKeywords, outstandingBalanceKeywords, } from '../constants';
import { IBalanceKeyWordsType } from '../interface';
import { getProcessedMessage, padCurrencyValue } from '../utils';
const extractBalance = (index, message, length) => {
    let balance = '';
    let sawNumber = false;
    let invalidCharCount = 0;
    let char = '';
    let start = index;
    while (start < length) {
        char = message[start];
        if (char >= '0' && char <= '9') {
            sawNumber = true;
            // is_start = false;
            balance += char;
        }
        else if (sawNumber) {
            if (char === '.') {
                if (invalidCharCount === 1) {
                    break;
                }
                else {
                    balance += char;
                    invalidCharCount += 1;
                }
            }
            else if (char !== ',') {
                break;
            }
        }
        start += 1;
    }
    return balance;
};
const findNonStandardBalance = (message, keyWordType = IBalanceKeyWordsType.AVAILABLE) => {
    const balanceKeywords = keyWordType === IBalanceKeyWordsType.AVAILABLE
        ? availableBalanceKeywords
        : outstandingBalanceKeywords;
    const balKeywordRegex = `(${balanceKeywords.join('|')})`.replace('/', '\\/');
    const amountRegex = '([\\d]+\\.[\\d]+|[\\d]+)';
    // balance 100.00
    let regex = new RegExp(`${balKeywordRegex}\\s*${amountRegex}`, 'gi');
    let matches = message.match(regex);
    if (matches && matches.length > 0) {
        const balance = matches[0].split(' ').pop(); // return only first match
        return Number.isNaN(Number(balance)) ? '' : balance;
    }
    // 100.00 available
    regex = new RegExp(`${amountRegex}\\s*${balKeywordRegex}`, 'gi');
    matches = message.match(regex);
    if (matches && matches.length > 0) {
        const balance = matches[0].split(' ')[0]; // return only first match
        return Number.isNaN(Number(balance)) ? '' : balance;
    }
    return null;
};
const getBalance = (message, keyWordType = IBalanceKeyWordsType.AVAILABLE) => {
    const processedMessage = getProcessedMessage(message);
    const messageString = processedMessage.join(' ');
    let indexOfKeyword = -1;
    let balance = '';
    const balanceKeywords = keyWordType === IBalanceKeyWordsType.AVAILABLE
        ? availableBalanceKeywords
        : outstandingBalanceKeywords;
    // eslint-disable-next-line no-restricted-syntax
    for (const word of balanceKeywords) {
        indexOfKeyword = messageString.indexOf(word);
        if (indexOfKeyword !== -1) {
            indexOfKeyword += word.length;
            break;
        }
        else {
            // eslint-disable-next-line no-continue
            continue;
        }
    }
    // found the index of keyword, moving on to finding 'rs.' occuring after indexOfKeyword
    let index = indexOfKeyword;
    let indexOfRs = -1;
    let nextThreeChars = messageString.substr(index, 3);
    index += 3;
    while (index < messageString.length) {
        // discard first char
        nextThreeChars = nextThreeChars.slice(1);
        // add the current char at the end
        nextThreeChars += messageString[index];
        if (nextThreeChars === 'rs.') {
            indexOfRs = index + 2;
            break;
        }
        index += 1;
    }
    // no occurence of 'rs.'
    if (indexOfRs === -1) {
        // check for non standard balance
        balance = findNonStandardBalance(messageString);
        return balance ? padCurrencyValue(balance) : null;
    }
    balance = extractBalance(indexOfRs, messageString, messageString.length);
    return balance ? padCurrencyValue(balance) : null;
};
export default getBalance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2JhbGFuY2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHdCQUF3QixFQUN4QiwwQkFBMEIsR0FDM0IsTUFBTSxjQUFjLENBQUM7QUFDdEIsT0FBTyxFQUFFLG9CQUFvQixFQUFnQixNQUFNLGNBQWMsQ0FBQztBQUNsRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFakUsTUFBTSxjQUFjLEdBQUcsQ0FDckIsS0FBYSxFQUNiLE9BQWUsRUFDZixNQUFjLEVBQ04sRUFBRTtJQUNWLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDdEIsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUFDekIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQ2QsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ2xCLE9BQU8sS0FBSyxHQUFHLE1BQU0sRUFBRTtRQUNyQixJQUFJLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRCLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO1lBQzlCLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDakIsb0JBQW9CO1lBQ3BCLE9BQU8sSUFBSSxJQUFJLENBQUM7U0FDakI7YUFBTSxJQUFJLFNBQVMsRUFBRTtZQUNwQixJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7Z0JBQ2hCLElBQUksZ0JBQWdCLEtBQUssQ0FBQyxFQUFFO29CQUMxQixNQUFNO2lCQUNQO3FCQUFNO29CQUNMLE9BQU8sSUFBSSxJQUFJLENBQUM7b0JBQ2hCLGdCQUFnQixJQUFJLENBQUMsQ0FBQztpQkFDdkI7YUFDRjtpQkFBTSxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7Z0JBQ3ZC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