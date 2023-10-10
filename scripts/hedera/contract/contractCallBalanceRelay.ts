import { ethers } from "hardhat";

export async function contractCallBalanceRelay(address: string) {
    const signers = await ethers.getSigners()
    const wallet = signers[0];
    const bank = await ethers.getContractAt('Bank', address, wallet);
    const callRes = await bank.getBalance.staticCall();

    console.log(callRes)
}
