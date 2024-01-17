"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/ban-ts-comment */
// eslint-disable-next-line import/no-unresolved
const ava_1 = __importDefault(require("ava"));
const engine_1 = require("../lib/engine");
const utils_1 = require("../lib/utils");
const testCases_json_1 = __importDefault(require("./testCases.json"));
testCases_json_1.default.forEach((testCase, index) => {
    (0, ava_1.default)(`${index + 2}: ${testCase.name}`, (t) => {
        var _a, _b;
        const expected = {
            account: {
                type: testCase.accountType,
                number: (_b = (_a = testCase.accountNumber) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : null,
                name: null,
            },
            transactionAmount: testCase.transactionAmount
                ? (0, utils_1.padCurrencyValue)(testCase.transactionAmount.toString())
                : null,
            transactionType: testCase.transactionType,
            balance: {
                available: testCase.balanceAvailable
                    ? (0, utils_1.padCurrencyValue)(testCase.balanceAvailable.toString())
                    : null,
                outstanding: null,
            },
            transactionId: null,
            merchantName: null,
        };
        // @ts-ignore
        if (testCase.balanceOutstanding) {
            expected.balance.outstanding = (0, utils_1.padCurrencyValue)(
            // @ts-ignore
            testCase.balanceOutstanding);
        }
        // @ts-ignore
        if (testCase.accountName) {
            // @ts-ignore
            expected.account.name = testCase.accountName;
        }
        const actual = (0, engine_1.getTransactionInfo)(testCase.message);
        t.deepEqual(actual, expected);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGVzdHMvZW5naW5lLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBc0Q7QUFDdEQsZ0RBQWdEO0FBQ2hELDhDQUF1QjtBQUV2QiwwQ0FBbUQ7QUFFbkQsd0NBQWdEO0FBRWhELHNFQUF5QztBQUV6Qyx3QkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRTtJQUNwQyxJQUFBLGFBQUksRUFBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEtBQUssUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7O1FBQzNDLE1BQU0sUUFBUSxHQUFxQjtZQUNqQyxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUEyQjtnQkFDMUMsTUFBTSxFQUFFLE1BQUEsTUFBQSxRQUFRLENBQUMsYUFBYSwwQ0FBRSxRQUFRLEVBQUUsbUNBQUksSUFBSTtnQkFDbEQsSUFBSSxFQUFFLElBQUk7YUFDWDtZQUNELGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxpQkFBaUI7Z0JBQzNDLENBQUMsQ0FBQyxJQUFBLHdCQUFnQixFQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDekQsQ0FBQyxDQUFDLElBQUk7WUFDUixlQUFlLEVBQUUsUUFBUSxDQUFDLGVBQTRDO1lBQ3RFLE9BQU8sRUFBRTtnQkFDUCxTQUFTLEVBQUUsUUFBUSxDQUFDLGdCQUFnQjtvQkFDbEMsQ0FBQyxDQUFDLElBQUEsd0JBQWdCLEVBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUN4RCxDQUFDLENBQUMsSUFBSTtnQkFDUixXQUFXLEVBQUUsSUFBSTthQUNsQjtZQUNELGFBQWEsRUFBRSxJQUFJO1lBQ25CLFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUM7UUFFRixhQUFhO1FBQ2IsSUFBSSxRQUFRLENBQUMsa0JBQWtCLEVBQUU7WUFDL0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBQSx3QkFBZ0I7WUFDN0MsYUFBYTtZQUNiLFFBQVEsQ0FBQyxrQkFBa0IsQ0FDNUIsQ0FBQztTQUNIO1FBRUQsYUFBYTtRQUNiLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRTtZQUN4QixhQUFhO1lBQ2IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztTQUM5QztRQUVELE1BQU0sTUFBTSxHQUFHLElBQUEsMkJBQWtCLEVBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXBELENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==