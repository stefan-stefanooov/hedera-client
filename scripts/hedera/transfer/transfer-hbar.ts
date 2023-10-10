import { AccountId, Client, Hbar, TransferTransaction } from "@hashgraph/sdk";
import { accountBalance } from "../env/account";

export async function transferHbar(from: AccountId | string, to: AccountId | string, amount: number, client: Client) {
    console.log("Sending HBAR transaction...");
    const response = await sendHbarTransaction(from, to, amount, client);
    const receipt = await response.getReceipt(client);
    const newBalance = await accountBalance(to, client);

    if(receipt.status.toString() === "SUCCESS") {
        console.log(`Hbar transfer successful. New Account has: ${newBalance.hbars.toString()} hbars}`);
        return true;
    } else {
        throw new Error("Transaction failed. Status: " + receipt.status.toString());
    }
}

async function sendHbarTransaction(from: AccountId | string, to: AccountId | string, amount: number, client: Client) {
    return await new TransferTransaction()
        .addHbarTransfer(from, Hbar.fromTinybars(-amount)) //Sending account
        .addHbarTransfer(to, Hbar.fromTinybars(amount)) //Receiving account
        .execute(client);
}
