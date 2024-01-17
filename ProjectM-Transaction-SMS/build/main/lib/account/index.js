"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const interface_1 = require("../interface");
const utils_1 = require("../utils");
const getCard = (message) => {
    let combinedCardName = '';
    const cardIndex = message.findIndex((word) => word === 'card' ||
        constants_1.combinedWords // Any combined word of card type
            .filter((w) => w.type === interface_1.IAccountType.CARD)
            .some((w) => {
            if (w.word === word) {
                combinedCardName = w.word;
                return true;
            }
            return false;
        }));
    const card = { type: null, name: null, number: null };
    // Search for "card" and if not found return empty obj
    if (cardIndex !== -1) {
        card.number = message[cardIndex + 1];
        card.type = interface_1.IAccountType.CARD;
        // If the data is false positive
        // return empty obj
        // Else return the card info
        if (Number.isNaN(Number(card.number))) {
            return {
                type: combinedCardName ? card.type : null,
                name: combinedCardName,
                number: null,
            };
        }
        return card;
    }
    return { type: null, name: null, number: null };
};
const getAccount = (message) => {
    const processedMessage = (0, utils_1.getProcessedMessage)(message);
    let accountIndex = -1;
    let account = {
        type: null,
        name: null,
        number: null,
    };
    // eslint-disable-next-line no-restricted-syntax
    for (const [index, word] of processedMessage.entries()) {
        if (word === 'ac') {
            if (index + 1 < processedMessage.length) {
                const accountNo = (0, utils_1.trimLeadingAndTrailingChars)(processedMessage[index + 1]);
                if (Number.isNaN(Number(accountNo))) {
                    // continue searching for a valid account number
                    // eslint-disable-next-line no-continue
                    continue;
                }
                else {
                    accountIndex = index;
                    account.type = interface_1.IAccountType.ACCOUNT;
                    account.number = accountNo;
                    break;
                }
            }
            else {
                // continue searching for a valid account number
                // eslint-disable-next-line no-continue
                continue;
            }
        }
        else if (word.includes('ac')) {
            const extractedAccountNo = (0, utils_1.extractBondedAccountNo)(word);
            if (extractedAccountNo === '') {
                // eslint-disable-next-line no-continue
                continue;
            }
            else {
                accountIndex = index;
                account.type = interface_1.IAccountType.ACCOUNT;
                account.number = extractedAccountNo;
                break;
            }
        }
    }
    // No occurence of the word "ac". Check for "card"
    if (accountIndex === -1) {
        account = getCard(processedMessage);
    }
    // Check for wallets
    if (!account.type) {
        const wallet = processedMessage.find((word) => {
            return constants_1.wallets.includes(word);
        });
        if (wallet) {
            account.type = interface_1.IAccountType.WALLET;
            account.name = wallet;
        }
    }
    // Check for special accounts
    if (!account.type) {
        const specialAccount = constants_1.combinedWords
            .filter((word) => word.type === interface_1.IAccountType.ACCOUNT)
            .find((w) => {
            return processedMessage.includes(w.word);
        });
        account.type = specialAccount === null || specialAccount === void 0 ? void 0 : specialAccount.type;
        account.name = specialAccount === null || specialAccount === void 0 ? void 0 : specialAccount.word;
    }
    // Extract last 4 digits of account number
    // E.g. 4334XXXXX4334
    if (account.number && account.number.length > 4) {
        account.number = account.number.slice(-4);
    }
    return account;
};
exports.default = getAccount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL2FjY291bnQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBc0Q7QUFDdEQsNENBQXdFO0FBQ3hFLG9DQUlrQjtBQUVsQixNQUFNLE9BQU8sR0FBRyxDQUFDLE9BQWlCLEVBQWdCLEVBQUU7SUFDbEQsSUFBSSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDMUIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FDakMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUNQLElBQUksS0FBSyxNQUFNO1FBQ2YseUJBQWEsQ0FBQyxpQ0FBaUM7YUFDNUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLHdCQUFZLENBQUMsSUFBSSxDQUFDO2FBQzNDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1lBQ1YsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDbkIsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDMUIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQ1AsQ0FBQztJQUNGLE1BQU0sSUFBSSxHQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFFcEUsc0RBQXNEO0lBQ3RELElBQUksU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxHQUFHLHdCQUFZLENBQUMsSUFBSSxDQUFDO1FBRTlCLGdDQUFnQztRQUNoQyxtQkFBbUI7UUFDbkIsNEJBQTRCO1FB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