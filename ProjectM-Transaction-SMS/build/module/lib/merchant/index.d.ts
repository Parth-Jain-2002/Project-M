import { TMessageType } from '../interface';
declare const extractMerchantInfo: (message: TMessageType) => {
    merchantName: any;
    transactionId: any;
};
export default extractMerchantInfo;
