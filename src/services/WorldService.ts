import {AppConf} from "../conf/AppConf";
import {IApiUtxo} from "../interfaces/btc";
import {AppModel} from "../models/AppModel";

export class WorldService {

    constructor(
        private conf: AppConf,
        private model: AppModel,
    ) {
    }

    async updateBTCFeeRates(): Promise<void> {
        const data = await (await fetch(this.conf.getFeesUrl)).json();
        this.model.btcData.updateFees(data);
    }

    async loadUtxos(address: string): Promise<IApiUtxo[]> {
        return await (await fetch(`${this.conf.btcApiUrl}/address/${address}/utxo`)).json();
    }
}