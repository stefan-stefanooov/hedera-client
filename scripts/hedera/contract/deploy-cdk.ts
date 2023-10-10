import { config } from "dotenv";
import { ethers } from "hardhat";

async function main() {
  config();

  const bankWalletFactory = await ethers.getContractFactory("BankWallet");
  const bankWalletContract = await bankWalletFactory.deploy();
  const bankWalletDeployRes = await bankWalletContract.waitForDeployment();
  const bankWalletAddr = await bankWalletDeployRes.getAddress();
  const walletDeployTrResp = await bankWalletDeployRes.deploymentTransaction();

  const bankFactory = await ethers.getContractFactory("Bank");
  const bankContract = await bankFactory.deploy(bankWalletAddr);
  const bankDeployRes = await bankContract.waitForDeployment();
  const bankAddr = await bankDeployRes.getAddress();
;
  const bankDeployTrResp = await bankDeployRes.deploymentTransaction();

  console.log(bankAddr)

  return bankAddr
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
