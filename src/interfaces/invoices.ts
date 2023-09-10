
export interface Trx {
    txid: string;
    commit_trxid: string;
}
export const InvoiceStatuses = [100, 101, 102, 103, 104, 105, 200, 400, 401, 402];
export type InvoiceStatus = typeof InvoiceStatuses[number];

export interface IGetInvoicesAnswer {
    total: number,
    project_id: number,
    items: IInvoiceTO[]
}
export interface IInvoiceTO {
    "_id": string,
    "id": number,
    "project_id": number,
    "invoice_address": string,
    "trx_speed": number,
    "fee_rate": number,
    "mint_amount": number,
    "receiver_address": string,
    "fees_service": number,
    "fee_trx_inscription": number,
    "fee_trx_transfer": number,
    "whitelist_tier": number,
    "receive_trx": {
        "_id": string
    },
    "Inscription_trx": {
        "_id": string
    },
    "transfer_trx": {
        "_id": string
    },
    "status": InvoiceStatus,
    "update_required": boolean,
    "last_check_time": number,
    "createdAt": string,
    "updatedAt": string,
    "__v": number,
    error?: string
}
