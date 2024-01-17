import { IAccountType } from './interface';
export const availableBalanceKeywords = [
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
export const outstandingBalanceKeywords = ['outstanding'];
export const wallets = ['paytm', 'simpl', 'lazypay', 'amazon_pay'];
export const upiKeywords = [
    'upi ref no',
    'upi ref',
    'upi p2p',
    'upi p2a',
    'upi p2m',
    'ref no',
    'upi',
];
export const combinedWords = [
    {
        regex: /credit\scard/g,
        word: 'c_card',
        type: IAccountType.CARD,
    },
    {
        regex: /amazon\spay/g,
        word: 'amazon_pay',
        type: IAccountType.WALLET,
    },
    {
        regex: /uni\scard/g,
        word: 'uni_card',
        type: IAccountType.CARD,
    },
    {
        regex: /niyo\scard/g,
        word: 'niyo',
        type: IAccountType.ACCOUNT,
    },
    {
        regex: /slice\scard/g,
        word: 'slice_card',
        type: IAccountType.CARD,
    },
    {
        regex: /one\s*card/g,
        word: 'one_card',
        type: IAccountType.CARD,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBa0IsTUFBTSxhQUFhLENBQUM7QUFFM0QsTUFBTSxDQUFDLE1BQU0sd0JBQXdCLEdBQUc7SUFDdEMsVUFBVTtJQUNWLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIsd0JBQXdCO0lBQ3hCLGlCQUFpQjtJQUNqQixTQUFTO0lBQ1QsUUFBUTtJQUNSLGVBQWU7SUFDZixTQUFTO0lBQ1QsaUJBQWlCO0lBQ2pCLGVBQWU7SUFDZixhQUFhO0lBQ2IsS0FBSztJQUNMLFNBQVM7SUFDVCxXQUFXO0NBQ1osQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFMUQsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFFbkUsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHO0lBQ3pCLFlBQVk7SUFDWixTQUFTO0lBQ1QsU0FBUztJQUNULFNBQVM7SUFDVCxTQUFTO0lBQ1QsUUFBUTtJQUNSLEtBQUs7Q0FDTixDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFxQjtJQUM3QztRQUNFLEtBQUssRUFBRSxlQUFlO1FBQ3RCLElBQUksRUFBRSxRQUFRO1FBQ2QsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJO0tBQ3hCO0lBQ0Q7UUFDRSxLQUFLLEVBQUUsY0FBYztRQUNyQixJQUFJLEVBQUUsWUFBWTtRQUNsQixJQUFJLEVBQUUsWUFBWSxDQUFDLE1BQU07S0FDMUI7SUFDRDtRQUNFLEtBQUssRUFBRSxZQUFZO1FBQ25CLElBQUksRUFBRSxVQUFVO1FBQ2hCLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSTtLQUN4QjtJQUNEO1FBQ0UsS0FBSyxFQUFFLGFBQWE7UUFDcEIsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsWUFBWSxDQUFDLE9BQU87S0FDM0I7SUFDRDtRQUNFLEtBQUssRUFBRSxjQUFjO1FBQ3JCLElBQUksRUFBRSxZQUFZO1FBQ2xCLElBQUksRUFBRSxZQUFZLENBQUMsSUFBSTtLQUN4QjtJQUNEO1FBQ0UsS0FBSyxFQUFFLGFBQWE7UUFDcEIsSUFBSSxFQUFFLFVBQVU7UUFDaEIsSUFBSSxFQUFFLFlBQVksQ0FBQyxJQUFJO0tBQ3hCO0NBQ0YsQ0FBQyJ9