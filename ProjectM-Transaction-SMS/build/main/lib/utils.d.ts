import { TMessageType } from './interface';
export declare const isNumber: (val: any) => boolean;
export declare const trimLeadingAndTrailingChars: (str: string) => string;
export declare const extractBondedAccountNo: (accountNo: string) => string;
export declare const processMessage: (message: string) => string[];
export declare const getProcessedMessage: (message: TMessageType) => string[];
export declare const padCurrencyValue: (val: string) => string;
export declare const getNextWords: (source: string, searchWord: string, count?: number) => string;
