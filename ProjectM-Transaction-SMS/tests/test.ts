import  {getTransactionInfo} from '../src/library/engine.ts'

let sms = `Dear Customer, A/c No. XXXXXXXX1234 is debited for Rs. 1000.00 on 2021-05-01 12:00:00 PM by UPI Ref no 123456789012. Avl Bal Rs. 1000.00.`;
sms = 'Dear UPI user A/Cxxx2037 debited by 75.0 on date 24Nov23 trf to BHOPAL CATERRERS Refno 332888663806. If not u? call 1800111109. -SBI';
//sms='Dear UPI user A/C X2037 debited by 75.0 on date 24Nov23 trf to BHOPAL CATERRERS Refno 332888663806. If not u? call 1800111109. -SBI
//sms = `Dear Customer, A/c No. XXXXXXXX1234 is debited for Rs. 1000.00 on 2021-05-01 12:00:00 PM by UPI Ref no 123456789012. Avl Bal Rs. 1000.00.`;
// sms = 'Dear UPI user A/Cxxx2037 debited by 75.0 on date 24Nov23 trf to BHOPAL CATERRERS Refno 332888663806. If not u? call 1800111109. -SBI';
console.log(getTransactionInfo(sms));