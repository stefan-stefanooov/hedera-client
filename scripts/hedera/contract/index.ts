
import { environmentSetup } from '../env/env-setup';
import { contractCallBalanceRelay } from './contractCallBalanceRelay';
import { contractCallFundSDK } from './contractCallFundSDK';

async function main() {
    const {
        clientLocal, myAccountId, myAccountIdLOCAL,
        newAccountId
    } = await environmentSetup();
    //contractCallFundSDK('0x8A7fa94487d0d0460550e5F3F80A663c39Ac8B10', clientLocal);
    contractCallBalanceRelay('0x8A7fa94487d0d0460550e5F3F80A663c39Ac8B10')
}
main();
