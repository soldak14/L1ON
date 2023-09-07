import {IProjectTO, IWhitelistTier, ProjectType} from "../interfaces/projects";

export class ProjectModel {
    private readonly _data: IProjectTO;

    constructor(_data: IProjectTO) {
        this._data = _data;
    }

    get id(): number {
        return this._data.id;
    }
    get _id(): string {
        return this._data._id;
    }
    get name(): string {
        return this._data.mint_info.name;
    }
    get description(): string {
        return this._data.mint_info.description;
    }
    get company(): string {
        return this._data.mint_info.company;
    }
    get company_url(): string {
        return this._data.mint_info.company_url;
    }
    get company_twitter(): string {
        return this._data.mint_info.company_twitter;
    }
    get terms(): string {
        return this._data.mint_info.terms;
    }
    get logo(): string {
        return this._data.design.logo;
    }
    get minted(): number {
        return this._data.minted;
    }
    get minted_unconfirmed(): number {
        return this._data.minted_unconfirmed;
    }
    get transferred(): number {
        return this._data.transferred;
    }

    get enabled(): boolean {
        return this._data.enabled;
    }
    get supply(): number {
        return this._data.supply;
    }

    get started(): boolean {
        return this._data.enabled && this.startTime < Date.now();
    }
    get ended(): boolean {
        return this._data.enabled && this.endTime < Date.now();
    }

    get active(): boolean {
        return this.started && !this.ended;
    }

    get startTime(): number {
        return this._data.time_start;
    }
    get endTime(): number {
        return this._data.time_end;
    }

    get activeWhitelistTier(): IWhitelistTier | undefined {
        return this.whitelistTiers.find((t) => t.time_start < Date.now() && t.time_end > Date.now());
    }

    get haveWhitelist(): boolean {
        return this._data.whitelist_enable;
    }

    get whitelistTiers() {
        return this._data.whitelist_tiers;
    }

    get nearestWhitelist(): IWhitelistTier | undefined {
        return this.whitelistTiers.sort((a, b) => a.time_start - b.time_start)[0]
    }

    get min_per_mint(): number {
        return this._data.min_per_mint;
    }
    get max_per_mint(): number {
        return this._data.max_per_mint;
    }

    get limit_per_addr(): number {
        return this._data.limit_per_addr;
    }

    get image(): string {
        return this._data.mint_info.image;
    }

    get isBrc20(): boolean {
        return this._data.projectType.mint_type === "brc-20";
    }
    get isHtml(): boolean {
        return this._data.projectType.mint_type === "html_r";
    }
    get projectType(): ProjectType {
        return this._data.projectType;
    }

    get getNearestEventTime(): number {
        if (this.started)
            return this.endTime;

        if (this.haveWhitelist)
        {
            const activeWhitelist = this.activeWhitelistTier;
            if (activeWhitelist)
                return activeWhitelist.time_end;

            return this.nearestWhitelist!.time_start;
        }
        return this.startTime;
    }

    get statuses(): number[] {
        let result: number[] = [100, 101, 102, 103];
        if (this.isBrc20)
            result = result.concat([104, 105]);
        return result.concat([200]);
    }
}