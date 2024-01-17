"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combinedWords = exports.upiKeywords = exports.wallets = exports.outstandingBalanceKeywords = exports.availableBalanceKeywords = void 0;
const interface_1 = require("./interface");
exports.availableBalanceKeywords = [
    'avbl bal',
    'available balance',
    'available limit',
    'available credit limit',
    'limit available',
    'a/c bal',
    'ac bal',
    'available bal',
    'avl bal',
    'updated balance',
    'total balance',
    'new balance',
    'bal',
    'avl lmt',
    'available',
];
exports.outstandingBalanceKeywords = ['outstanding'];
exports.wallets = ['paytm', 'simpl', 'lazypay', 'amazon_pay'];
exports.upiKeywords = [
    'upi ref no',
    'upi ref',
    'upi p2p',
    'upi p2a',
    'upi p2m',
    'ref no',
    'upi',
];
exports.combinedWords = [
    {
        regex: /credit\scard/g,
        word: 'c_card',
        type: interface_1.IAccountType.CARD,
    },
    {
        regex: /amazon\spay/g,
        word: 'amazon_pay',
        type: interface_1.IAccountType.WALLET,
    },
    {
        regex: /uni\scard/g,
        word: 'uni_card',
        type: interface_1.IAccountType.CARD,
    },
    {
        regex: /niyo\scard/g,
        word: 'niyo',
        type: interface_1.IAccountType.ACCOUNT,
    },
    {
        regex: /slice\scard/g,
        word: 'slice_card',
        type: interface_1.IAccountType.CARD,
    },
    {
        regex: /one\s*card/g,
        word: 'one_card',
        type: interface_1.IAccountType.CARD,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQTJEO0FBRTlDLFFBQUEsd0JBQXdCLEdBQUc7SUFDdEMsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIsd0JBQXdCO0lBQ3hCLGlCQUFpQjtJQUNqQixTQUFTO0lBQ1QsUUFBUTtJQUNSLGVBQWU7SUFDZixTQUFTO0lBQ1QsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixhQUFhO0lBQ2IsS0FBSztJQUNMLFNBQVM7SUFDVCxXQUFXO0NBQ1osQ0FBQztBQUVXLFFBQUEsMEJBQTBCLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUU3QyxRQUFBLE9BQU8sR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBRXRELFFBQUEsV0FBVyxHQUFHO0lBQ3pCLFlBQVk7SUFDWixTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsUUFBUTtJQUNSLEtBQUs7Q0FDTixDQUFDO0FBRVcsUUFBQSxhQUFhLEdBQXFCO0lBQzdDO1FBQ0UsS0FBSyxFQUFFLGVBQWU7UUFDdEIsSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUUsd0JBQVksQ0FBQyxJQUFJO0tBQ3hCO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsY0FBYztRQUNyQixJQUFJLEVBQUUsWUFBWTtRQUNsQixJQUFJLEVBQUUsd0JBQVksQ0FBQyxNQUFNO0tBQzFCO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsWUFBWTtRQUNuQixJQUFJLEVBQUUsVUFBVTtRQUNoQixJQUFJLEVBQUUsd0JBQVksQ0FBQyxJQUFJO0tBQ3hCO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsYUFBYTtRQUNwQixJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSx3QkFBWSxDQUFDLE9BQU87S0FDM0I7SUFDRDtRQUNFLEtBQUssRUFBRSxjQUFjO1FBQ3JCLElBQUksRUFBRSxZQUFZO1FBQ2xCLElBQUksRUFBRSx3QkFBWSxDQUFDLElBQUk7S0FDeEI7SUFDRDtRQUNFLEtBQUssRUFBRSxhQUFhO1FBQ3BCLElBQUksRUFBRSxVQUFVO1FBQ2hCLElBQUksRUFBRSx3QkFBWSxDQUFDLElBQUk7S0FDeEI7Q0FDRixDQUFDIn0=