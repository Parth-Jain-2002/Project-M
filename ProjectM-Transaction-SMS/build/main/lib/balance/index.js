"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const interface_1 = require("../interface");
const utils_1 = require("../utils");
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
const findNonStandardBalance = (message, keyWordType = interface_1.IBalanceKeyWordsType.AVAILABLE) => {
    const balanceKeywords = keyWordType === interface_1.IBalanceKeyWordsType.AVAILABLE
        ? constants_1.availableBalanceKeywords
        : constants_1.outstandingBalanceKeywords;
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
const getBalance = (message, keyWordType = interface_1.IBalanceKeyWordsType.AVAILABLE) => {
    const processedMessage = (0, utils_1.getProcessedMessage)(message);
    const messageString = processedMessage.join(' ');
    let indexOfKeyword = -1;
    let balance = '';
    const balanceKeywords = keyWordType === interface_1.IBalanceKeyWordsType.AVAILABLE
        ? constants_1.availableBalanceKeywords
        : constants_1.outstandingBalanceKeywords;
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
        return balance ? (0, utils_1.padCurrencyValue)(balance) : null;
    }
    balance = extractBalance(indexOfRs, messageString, messageString.length);
    return balance ? (0, utils_1.padCurrencyValue)(balance) : null;
};
exports.default = getBalance;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2JhbGFuY2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FHc0I7QUFDdEIsNENBQWtFO0FBQ2xFLG9DQUFpRTtBQUVqRSxNQUFNLGNBQWMsR0FBRyxDQUNyQixLQUFhLEVBQ2IsT0FBZSxFQUNmLE1BQWMsRUFDTixFQUFFO0lBQ1YsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN0QixJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQztJQUN6QixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7SUFDZCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDbEIsT0FBTyxLQUFLLEdBQUcsTUFBTSxFQUFFO1FBQ3JCLElBQUksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdEIsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7WUFDOUIsU0FBUyxHQUFHLElBQUksQ0FBQztZQUNqQixvQkFBb0I7WUFDcEIsT0FBTyxJQUFJLElBQUksQ0FBQztTQUNqQjthQUFNLElBQUksU0FBUyxFQUFFO1lBQ3BCLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtnQkFDaEIsSUFBSSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUU7b0JBQzFCLE1BQU07aUJBQ1A7cUJBQU07b0JBQ0wsT0FBTyxJQUFJLElBQUksQ0FBQztvQkFDaEIsZ0JBQWdCLElBQUksQ0FBQyxDQUFDO2lCQUN2QjthQUNGO2lCQUFNLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtnQkFDdkIsTUFBTTthQUNQO1NBQ0Y7UUFFRCxLQUFLLElBQUksQ0FBQyxDQUFDO0tBQ1o7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUM7QUFFRixNQUFNLHNCQUFzQixHQUFHLENBQzdCLE9BQWUs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