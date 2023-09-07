export interface IWhitelistTier {
    "tier": number,
    "time_start": number,
    "time_end": number,
    "fee_author": number,
    "fee_project": number,
    "_id": string
}


export interface IGetProjectsAnswer {
    total: number,
    items: IProjectTO[]
}

export interface ProjectType
{
    "mint_type": string,
    "content_type": string,
    "table_name": string,
    "data_obj": {
        "p": string,
        "op": string,
        "tick": string,
        "amt": string
    } | any,
    "data_str": string,
    "data_arr": any[],
    "data_s1": string,
    "_id": string
}
export interface IProjectTO {
    "_id": string,
    "id": number,
    "btc_address": string,
    "projectType": ProjectType,
    "supply": number,
    "minted": number,
    "minted_unconfirmed": number,
    "transferred": number,
    "time_start": number,
    "time_end": number,
    "fee_author": number,
    "fee_author_address": string,
    "fee_project": number,
    "max_per_mint": number,
    "min_per_mint": number,
    "limit_per_addr": number,
    "whitelist_enable": boolean,
    "whitelist_tiers": IWhitelistTier[],
    "design": {
        "logo": string,
        "banner": string,
        "bgcolor": string,
        "textcolor": string,
        "_id": string
    },
    "mint_info": {
        "name": string,
        "description": string,
        "image": string,
        "company": string,
        "company_url": string,
        "company_twitter": string,
        "terms": string,
        "_id": string
    },
    "stats": {
        "total_authors_fees": number,
        "total_authors_fees_unconfirmed": number,
        "total_project_fees": number,
        "total_project_fees_unconfirmed": number,
        "_id": string
    },
    "enabled": boolean,
    "__v": number,
    "createdAt": string,
    "updatedAt": string
}

export interface ICreatedInvoiceParams {
    project_id: number,
    mint_amount: number,
    receiver_address: string,
    trx_speed: string
}