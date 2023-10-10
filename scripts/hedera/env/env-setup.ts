import { PrivateKey } from "@hashgraph/sdk";
import { config } from "dotenv";
import { clientCreateLocalNode, clientCreateTestNet } from "./hedera-client";
import { createHederaAccount } from "./account";

export async function environmentSetup() {
    config();
    //Grab your Hedera  account ID and private key from your .env file
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;

    const myAccountIdLOCAL = process.env.MY_ACCOUNT_ID_LOCAL;
    const myPrivateKeyLOCAL = process.env.MY_PRIVATE_KEY_LOCAL;
    // If we weren't able to grab it, we should throw a new error
    if (!myAccountId || !myPrivateKey || !myAccountIdLOCAL || !myPrivateKeyLOCAL) {
        throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY and MY_ACCOUNT_ID_LOCAL and MY_PRIVATE_KEY_LOCAL must be present");
    }

    console.log("Creating client...")
    const client = await clientCreateTestNet(myAccountId, myPrivateKey);
    const clientLocal = await clientCreateLocalNode(myAccountIdLOCAL, myPrivateKeyLOCAL);
    console.log(`Done !`)
    console.log("Creating new account...")
    const { 
        account, newAccountPublicKey, newAccountId
    } = await createHederaAccount(client);
    console.log(`Done ! ${newAccountId}`)

    return { 
        myAccountId,
        myAccountIdLOCAL,
        client,
        account,
        newAccountPublicKey,
        newAccountId,
        clientLocal
    };
}
