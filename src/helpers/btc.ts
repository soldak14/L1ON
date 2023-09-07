import {hex} from "@scure/base";
import * as btc from "@scure/btc-signer";
import {NETWORK, TEST_NETWORK, Transaction} from "@scure/btc-signer";
import * as secp256k1 from "secp256k1";
import {IApiUtxo} from "../interfaces/btc";

const dummyPrivateKey = hex.decode("0101010101010101010101010101010101010101010101010101010101010101");
const dummyPublicKey = secp256k1.publicKeyCreate(dummyPrivateKey, true);

export function getSendBtcTx(fromAddress: string, toAddress: string, amount: number, publicKey: Uint8Array, utxosToUse: IApiUtxo[], satsPerVbyte: number, network: typeof NETWORK | typeof TEST_NETWORK): Transaction {
    const dummyTx = generateSendBtcTx(fromAddress, toAddress, amount, dummyPublicKey, utxosToUse, 0, network);
    dummyTx.sign(dummyPrivateKey);
    dummyTx.finalize();

    return generateSendBtcTx(fromAddress, toAddress, amount, publicKey, utxosToUse, dummyTx.vsize * satsPerVbyte, network);
}

function generateSendBtcTx(fromAddress: string, toAddress: string, amount: number, pubKey: Uint8Array, utxosToUse: IApiUtxo[], tx_fee: number, network: typeof NETWORK | typeof TEST_NETWORK): Transaction {
    const p2wpkh = btc.p2wpkh(pubKey, network);
    const p2sh = btc.p2sh(p2wpkh, network);

    const totalInValue = utxosToUse.map(it => it.value).reduce((partialSum, a) => partialSum + a, 0);

    const tx = new btc.Transaction();
    for (const u of utxosToUse) {
        tx.addInput({
            txid: u.txid,
            index: u.vout,
            witnessUtxo: {
                script: p2sh.script,
                amount: BigInt(u.value),
            },
            redeemScript: p2sh.redeemScript,
        });
    }

    tx.addOutputAddress(toAddress, BigInt(amount), network);
    tx.addOutputAddress(fromAddress, BigInt(totalInValue - amount - tx_fee), network);
    return tx;
}
