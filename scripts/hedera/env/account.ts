import {
    AccountBalanceQuery, AccountCreateTransaction, AccountId, 
    Client, Hbar, PrivateKey
} from "@hashgraph/sdk";
import { DEFAULT_HBAR_BALANCE } from "../../config";

export async function createHederaAccount(client: Client, initialBalance = DEFAULT_HBAR_BALANCE) {
    const newAccountPrivateKey = PrivateKey.generateED25519(); 
    const newAccountPublicKey = newAccountPrivateKey.publicKey;
    //Create a new account with 1,000 tinybar starting balance
    const account =  await new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(Hbar.fromTinybars(initialBalance))
    .execute(client);

    const getReceipt = await account.getReceipt(client);
    const newAccountId = getReceipt.accountId;
    if (!newAccountId) {
        throw new Error("New account ID is undefined. Something went wrong with its creation.");
    }
    const balance = await accountBalance(newAccountId, client);

    return {
        newAccountPrivateKey,
        newAccountPublicKey,
        account,
        newAccountId,
        balance
    }
}

export async function accountBalance(newAccountId: AccountId | string, client: Client) {
    if(newAccountId) {
        return await new AccountBalanceQuery()
        .setAccountId(newAccountId)
        .execute(client);
    }

    throw new Error("Account ID not found");   
}
