export class LocalDataService {
    private _wallet?:{wallet: string, address: string, key: string, address2: string, key2: string};

    constructor() {
        this.init();
    }

    init() {
        let storage = window.localStorage;
        this._wallet = storage.getItem("wallet") ? JSON.parse(storage.getItem("wallet")!) : undefined;
    }

    clear() {
        this._wallet = undefined;
        this.flush();
    }

    flush() {
        let storage = window.localStorage;
        storage.setItem("wallet", this._wallet ? JSON.stringify(this._wallet) : "");
    }

    logout() {
        this._wallet = undefined;
        this.flush();
    }

    get wallet() {
        return this._wallet;
    }

    set wallet(value: {wallet: string, address: string, key: string, address2: string, key2: string} | undefined) {
        this._wallet = value;
        this.flush();
    }
}
