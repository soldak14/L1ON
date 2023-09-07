
export interface Trx {
    txid: string;
    commit_trxid: string;
}
export const InvoiceStatuses = [100, 101, 102, 103, 104, 105, 200, 400, 401, 402];
export type InvoiceStatus = typeof InvoiceStatuses[number];

export interface IWhitelistCheckAddressAnswer {
    "project_id": number,
    "receiver_address": string,
    "items": IWhitelistCheckAddressTO[],
    error?: string
}
export interface IWhitelistCheckAddressTO {
    "_id": string,
    "project_id": number,
    "address": string,
    "tier": number,
    "__v": number,
    "createdAt": string,
    "updatedAt": string
}
