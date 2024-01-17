"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { upiKeywords } from '../constants';
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const extractMerchantInfo = (message) => {
    const processedMessage = (0, utils_1.getProcessedMessage)(message);
    const messageString = processedMessage.join(' ');
    const merchantInfo = {
        merchantName: null,
        transactionId: null,
    };
    if (processedMessage.includes('vpa')) {
        const idx = processedMessage.indexOf('vpa');
        // if keyword vpa is not the last one
        if (idx < processedMessage.length - 1) {
            const nextStr = processedMessage[idx + 1];
            const [name] = nextStr.replaceAll(/\(|\)/gi, ' ').split(' ');
            merchantInfo.merchantName = name;
        }
    }
    let match = '';
    for (let i = 0; i < constants_1.upiKeywords.length; i += 1) {
        const keyword = constants_1.upiKeywords[i];
        const idx = messageString.indexOf(keyword);
        if (idx > 0) {
            match = keyword;
            break;
        }
    }
    if (match) {
        const nextWord = (0, utils_1.getNextWords)(messageString, match);
        if ((0, utils_1.isNumber)(nextWord)) {
            merchantInfo.transactionId = nextWord;
        }
        else if (merchantInfo.merchantName) {
            const [longestNumeric] = nextWord
                .split(/[^0-9]/gi)
                .sort((a, b) => b.length - a.length)[0];
            if (longestNumeric) {
                merchantInfo.transactionId = longestNumeric;
            }
        }
        else {
            merchantInfo.merchantName = nextWord;
        }
    }
    /* const additionalKeywords = ['at', 'to', 'info'];
    if (!merchantInfo.merchantName && !merchantInfo.transactionId) {
      for (let i = 0; i < additionalKeywords.length; i += 1) {
        const nextWord = getNextWords(messageString, additionalKeywords[i], 2);
  
        if (nextWord) {
          merchantInfo.merchantName = nextWord;
          break;
        }
      }
    } */
    return merchantInfo;
};
exports.default = extractMerchantInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21lcmNoYW50L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQThDO0FBQzlDLDRDQUEyQztBQUUzQyxvQ0FBdUU7QUFFdkUsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLE9BQXFCLEVBQUUsRUFBRTtJQUNwRCxNQUFNLGdCQUFnQixHQUFHLElBQUEsMkJBQW1CLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEQsTUFBTSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sWUFBWSxHQUFHO1FBQ25CLFlBQVksRUFBRSxJQUFJO1FBQ2xCLGFBQWEsRUFBRSxJQUFJO0tBQ3BCLENBQUM7SUFDRixJQUFJLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNwQyxNQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMscUNBQXFDO1FBQ3JDLElBQUksR0FBRyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDckMsTUFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0QsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDbEM7S0FDRjtJQUVELElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyx1QkFBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzlDLE1BQU0sT0FBTyxHQUFHLHVCQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDWCxLQUFLLEdBQUcsT0FBTyxDQUFDO1lBQ2hCLE1BQU07U0FDUDtLQUNGO0lBRUQsSUFBSSxLQUFLLEVBQUU7UUFDVCxNQUFNLFFBQVEsR0FBRyxJQUFBLG9CQUFZLEVBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BELElBQUksSUFBQSxnQkFBUSxFQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3RCLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxZQUFZLENBQUMsWUFBWSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxRQUFRO2lCQUM5QixLQUFLLENBQUMsVUFBVSxDQUFDO2lCQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLGNBQWMsRUFBRTtnQkFDbEIsWUFBWSxDQUFDLGFBQWEsR0FBRyxjQUFjLENBQUM7YUFDN0M7U0FDRjthQUFNO1lBQ0wsWUFBWSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7U0FDdEM7S0FDRjtJQUVEOzs7Ozs7Ozs7O1FBVUk7SUFDSixPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDLENBQUM7QUFFRixrQkFBZSxtQkFBbUIsQ0FBQyJ9