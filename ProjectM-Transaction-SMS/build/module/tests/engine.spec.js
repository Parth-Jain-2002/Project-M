/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line import/no-unresolved
import test from 'ava';
import { getTransactionInfo } from '../lib/engine';
import { padCurrencyValue } from '../lib/utils';
import testCases from './testCases.json';
testCases.forEach((testCase, index) => {
    test(`${index + 2}: ${testCase.name}`, (t) => {
        const expected = {
            account: {
                type: testCase.accountType,
                number: testCase.accountNumber?.toString() ?? null,
                name: null,
            },
            transactionAmount: testCase.transactionAmount
                ? padCurrencyValue(testCase.transactionAmount.toString())
                : null,
            transactionType: testCase.transactionType,
            balance: {
                available: testCase.balanceAvailable
                    ? padCurrencyValue(testCase.balanceAvailable.toString())
                    : null,
                outstanding: null,
            },
            transactionId: null,
            merchantName: null,
        };
        // @ts-ignore
        if (testCase.balanceOutstanding) {
            expected.balance.outstanding = padCurrencyValue(
            // @ts-ignore
            testCase.balanceOutstanding);
        }
        // @ts-ignore
        if (testCase.accountName) {
            // @ts-ignore
            expected.account.name = testCase.accountName;
        }
        const actual = getTransactionInfo(testCase.message);
        t.deepEqual(actual, expected);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvZW5naW5lLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsc0RBQXNEO0FBQ3RELGdEQUFnRDtBQUNoRCxPQUFPLElBQUksTUFBTSxLQUFLLENBQUM7QUFFdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRW5ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUVoRCxPQUFPLFNBQVMsTUFBTSxrQkFBa0IsQ0FBQztBQUV6QyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ3BDLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEtBQUssUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDM0MsTUFBTSxRQUFRLEdBQXFCO1lBQ2pDLE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUSxDQUFDLFdBQTJCO2dCQUMxQyxNQUFNLEVBQUUsUUFBUSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxJQUFJO2dCQUNsRCxJQUFJLEVBQUUsSUFBSTthQUNYO1lBQ0QsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLGlCQUFpQjtnQkFDM0MsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDekQsQ0FBQyxDQUFDLElBQUk7WUFDUixlQUFlLEVBQUUsUUFBUSxDQUFDLGVBQTRDO1lBQ3RFLE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUUsUUFBUSxDQUFDLGdCQUFnQjtvQkFDbEMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDeEQsQ0FBQyxDQUFDLElBQUk7Z0JBQ1IsV0FBVyxFQUFFLElBQUk7YUFDbEI7WUFDRCxhQUFhLEVBQUUsSUFBSTtZQUNuQixZQUFZLEVBQUUsSUFBSTtTQUNuQixDQUFDO1FBRUYsYUFBYTtRQUNiLElBQUksUUFBUSxDQUFDLGtCQUFrQixFQUFFO1lBQy9CLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLGdCQUFnQjtZQUM3QyxhQUFhO1lBQ2IsUUFBUSxDQUFDLGtCQUFrQixDQUM1QixDQUFDO1NBQ0g7UUFFRCxhQUFhO1FBQ2IsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3hCLGFBQWE7WUFDYixRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDO1NBQzlDO1FBRUQsTUFBTSxNQUFNLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXBELENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==