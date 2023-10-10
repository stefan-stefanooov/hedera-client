import { HardhatUserConfig, scope, task, types } from "hardhat/config";
import { config } from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { environmentSetup } from "./scripts/hedera/env/env-setup";

config();

const rpcUrlHederatestnet = process.env.RPC_URL_HEDERATESTNET;
if (!rpcUrlHederatestnet || !rpcUrlHederatestnet.startsWith('http')) {
  throw new Error(
    'Missing RPC URL in RPC_URL_HEDERATESTNET env var',
  );
}

const rpcUrlLocalNode = process.env.RPC_URL_LOCALNODE;
if (!rpcUrlLocalNode || !rpcUrlLocalNode.startsWith('http')) {
  throw new Error(
    'Missing RPC URL in RPC_URL_LOCALNODE env var',
  );
}

const myPrivateKey = process.env.MY_PRIVATE_KEY;

const hederaScope = scope("hedera", "Hedera tasks");

hederaScope.task('env')
  .setDescription('set up the environment')
  .setAction(async (params, hre) => {
    const env = await environmentSetup();

    return env
  })

hederaScope.task('contractCall')
  .setDescription('call contract on address')
  .addOptionalParam(
    "addr",
    "The address of the contract",
    1,
    types.string
  )
  .setAction(async () => {
    return environmentSetup()
  })

hederaScope.task('fund')
  .setDescription('calls the Fund function on Bank.sol')
  .setAction(async ({ addr }, hre: HardhatRuntimeEnvironment) => {
      const env = await hre.run({
        task: 'env',
        scope: 'hedera',
      });

      return await hre.run({
        task: 'contractCall',
        scope: 'hedera',
      }, {
        contractId: '0x8A7fa94487d0d0460550e5F3F80A663c39Ac8B10',
        client: env.clientLocal,
      });
    // const addres = await hre.run("deploy");

    // return contractCallFund(addres, env.client);
  })

const hardHatConfig: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "local",
  networks: {
    local: {
      url: rpcUrlLocalNode,
      accounts: [
        "0x105d050185ccb907fba04dd92d8de9e32c18305e097ab41dadda21489a211524",
        "0x2e1d968b041d84dd120a5860cee60cd83f9374ef527ca86996317ada3d0d03e7"
      ],
      chainId: 298,
    },
    testnet: {
      url: process.env.RPC_URL_HEDERATESTNET,
      accounts: [],
      chainId: 296,
    },
  }
};

export default hardHatConfig;
