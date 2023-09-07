import {action, makeObservable, observable} from "mobx";
import {WhitelistModel} from "./WhitelistModel";

export class WhitelistsTable {
    items: Map<string, Map<number, WhitelistModel[]>>
        = new Map<string, Map<number, WhitelistModel[]>>();

    constructor() {
        makeObservable(this, {
            items: observable,
            clear: action,
            update: action,
        });
    }

    update(address: string, project_id: number, items: WhitelistModel[]) {
        let item = this.items.get(address);
        if (!item) {
            item = new Map<number, WhitelistModel[]>()
        }
        item.set(project_id, items);
        this.items.set(address, item);
    }

    query(address: string, project_id: number, predicate: (it: WhitelistModel) => boolean): WhitelistModel[] {
        const result: WhitelistModel[] = [];
        if (!this.items.has(address)) {
            return result;
        }
        if (!this.items.get(address)!.has(project_id)) {
            return result;
        }

        this.items.get(address)!.get(project_id)!.forEach((item) => {
            if (predicate(item))
                result.push(item);
        });
        return result;
    }

    getById(address: string, project_id: number): WhitelistModel[] | undefined {
        if (!this.items.has(address)) {
            return undefined;
        }
        return this.items.get(address)!.get(project_id);
    }

    isLoaded(address: string, project_id: number): boolean {
        const obj = this.items.get(address)?.get(project_id);
        return obj !== undefined;
    }

    queryAll(address: string, project_id: number) {
        return this.query(address, project_id, () => true);
    }

    isWhitelisted(address: string, project_id: number, tier: number): boolean {
        return (this.getById(address, project_id) || []).find(it=> it.tier === tier) !== undefined;
    }

    clear() {
        this.items.clear();
    }
}