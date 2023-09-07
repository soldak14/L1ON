import {IWhitelistCheckAddressTO} from "../interfaces/address_whitelist";

export class WhitelistModel {
    private readonly _data: IWhitelistCheckAddressTO;

    constructor(_data: IWhitelistCheckAddressTO) {
        this._data = _data;
        this._data
    }

    get tier(): number {
        return this._data.tier;
    }
}