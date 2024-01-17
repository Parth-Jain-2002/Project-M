import { ITransactionInfo, TMessageType, TTransactionType } from './interface';
export declare const getTransactionAmount: (message: TMessageType) => string;
export declare const getTransactionType: (message: TMessageType) => TTransactionType;
export declare const getTransactionInfo: (message: string) => ITransactionInfo;
