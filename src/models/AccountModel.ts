import { action, makeObservable, observable } from "mobx";

export class AccountModel {
  public logined = false;
  private _paymentAddress = { address: "", pubKey: "" };
  private _ordinalsAddress = { address: "", pubKey: "" };

  private _inscriptions: string[] = [];

  constructor() {
    makeObservable(this, {
      logined: observable,
      login: action,
      logout: action,
    });
  }

  login(
    address: string,
    pub: string,
    p2tr_address: string,
    p2tr_pub: string,
    inscriptions: string[]
  ) {
    this._paymentAddress = { address: address, pubKey: pub };
    this._ordinalsAddress = { address: p2tr_address, pubKey: p2tr_pub };
    this._inscriptions = inscriptions;
    this.logined = true;
  }

  logout() {
    this._paymentAddress = { address: "", pubKey: "" };
    this._ordinalsAddress = { address: "", pubKey: "" };
    this._inscriptions = [];
    this.logined = false;
  }

  get address(): string {
    return this._paymentAddress.address;
  }

  get p2trAddress(): string {
    return this._ordinalsAddress.address;
  }

  get ordinalAddress(): string {
    return this.p2trAddress || this.address;
  }

  get pub(): string {
    return this._paymentAddress.pubKey;
  }
  get p2tr_pub(): string {
    return this._paymentAddress.pubKey;
  }
  get inscriptins(): string[] {
    return this._inscriptions;
  }
}
