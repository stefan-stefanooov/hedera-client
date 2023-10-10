import { environmentSetup } from '../env/env-setup';
import { transferHbar } from './transfer-hbar';

async function main() {
    const {
        clientLocal, myAccountId, myAccountIdLOCAL,
        newAccountId
    } = await environmentSetup();
    transferHbar(myAccountIdLOCAL, '0.0.1003', 200, clientLocal);
}
main();
