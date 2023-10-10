
import {
    Client,
    ContractExecuteTransaction,
    ContractId,
} from "@hashgraph/sdk";
import { DEFAULT_GAS } from "../../config";

export async function contractCallFundSDK(contractId: string, client: Client) {
    console.log(`Calling contract...${contractId}`);
    //Create the transaction
    const transaction = new ContractExecuteTransaction()
        .setContractId(ContractId.fromEvmAddress(0,0,contractId))
        .setGas(DEFAULT_GAS)
        .setFunction("fund")

    //Sign with the client operator private key to pay for the transaction and submit the query to a Hedera network
    const txResponse = await transaction.execute(client);

    //Request the receipt of the transaction
    const receipt = await txResponse.getReceipt(client);

    //Get the transaction consensus status
    const transactionStatus = receipt.status;

    console.log(`The transaction consensus status is: ${transactionStatus}`);
    
    return transactionStatus;
}
