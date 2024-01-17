export * from './lib/engine';
export * from './lib/interface';
export declare const getAccountInfo: (message: import("./lib/interface").TMessageType) => import("./lib/interface").IAccountInfo;
export declare const getBalanceInfo: (message: import("./lib/interface").TMessageType, keyWordType?: import("./lib/interface").IBalanceKeyWordsType) => string;
export declare const getMerchantInfo: (message: import("./lib/interface").TMessageType) => {
    merchantName: any;
    transactionId: any;
};
