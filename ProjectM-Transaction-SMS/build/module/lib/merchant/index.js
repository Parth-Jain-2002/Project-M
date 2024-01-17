// import { upiKeywords } from '../constants';
import { upiKeywords } from '../constants';
import { getNextWords, getProcessedMessage, isNumber } from '../utils';
const extractMerchantInfo = (message) => {
    const processedMessage = getProcessedMessage(message);
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
    for (let i = 0; i < upiKeywords.length; i += 1) {
        const keyword = upiKeywords[i];
        const idx = messageString.indexOf(keyword);
        if (idx > 0) {
            match = keyword;
            break;
        }
    }
    if (match) {
        const nextWord = getNextWords(messageString, match);
        if (isNumber(nextWord)) {
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
export default extractMerchantInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL21lcmNoYW50L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhDQUE4QztBQUM5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRTNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXZFLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxPQUFxQixFQUFFLEVBQUU7SUFDcEQsTUFBTSxnQkFBZ0IsR0FBRyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RCxNQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakQsTUFBTSxZQUFZLEdBQUc7UUFDbkIsWUFBWSxFQUFFLElBQUk7UUFDbEIsYUFBYSxFQUFFLElBQUk7S0FDcEIsQ0FBQztJQUNGLElBQUksZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3BDLE1BQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxxQ0FBcUM7UUFDckMsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQyxNQUFNLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3RCxZQUFZLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUNsQztLQUNGO0lBRUQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM5QyxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7WUFDWCxLQUFLLEdBQUcsT0FBTyxDQUFDO1lBQ2hCLE1BQU07U0FDUDtLQUNGO0lBRUQsSUFBSSxLQUFLLEVBQUU7UUFDVCxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3RCLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1NBQ3ZDO2FBQU0sSUFBSSxZQUFZLENBQUMsWUFBWSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxRQUFRO2lCQUM5QixLQUFLLENBQUMsVUFBVSxDQUFDO2lCQUNqQixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLGNBQWMsRUFBRTtnQkFDbEIsWUFBWSxDQUFDLGFBQWEsR0FBRyxjQUFjLENBQUM7YUFDN0M7U0FDRjthQUFNO1lBQ0wsWUFBWSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7U0FDdEM7S0FDRjtJQUVEOzs7Ozs7Ozs7O1FBVUk7SUFDSixPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDLENBQUM7QUFFRixlQUFlLG1CQUFtQixDQUFDIn0=