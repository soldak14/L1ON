import {IInvoiceTO} from "../interfaces/invoices";

export class InvoiceModel {
    private readonly _data: IInvoiceTO;

    constructor(_data: IInvoiceTO) {
        this._data = _data;
    }

    get id(): number {
        return this._data.id;
    }
    get project_id(): number {
        return this._data.project_id;
    }
    get address(): string {
        return this._data.invoice_address;
    }
    get amount(): number {
        return this._data.mint_amount;
    }
    get status(): number {
        return this._data.status;
    }
    get receiver(): string {
        return this._data.receiver_address;
    }

    get networkFee(): number {
        return this._data.fee_trx_transfer + this._data.fee_trx_inscription;
    }
    get feeRate(): number {
        return this._data.fee_rate;
    }

    get totalPrice(): number {
        return this._data.fees_service + this.networkFee;
    }

    get needPayment(): boolean {
        return this._data.status === 100;
    }

    get validUntil(): number {
        return Date.parse(this._data.createdAt) + 60*60*1000;
    }

    get failed(): boolean {
        return this._data.status >= 400 && this._data.status < 500;
    }
}