import { IBalanceKeyWordsType, TMessageType } from '../interface';
declare const getBalance: (message: TMessageType, keyWordType?: IBalanceKeyWordsType) => string;
export default getBalance;
