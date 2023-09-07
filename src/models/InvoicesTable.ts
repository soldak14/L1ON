import {action, makeObservable, observable} from "mobx";
import {InvoiceModel} from "./InvoiceModel";

export class InvoicesTable {
    items: Map<number, { total: number, items: Map<number, InvoiceModel> }>
        = new Map<number, { total: number, items: Map<number, InvoiceModel> }>();

    constructor() {
        makeObservable(this, {
            items: observable,
            clear: action,
            update: action,
        });
    }

    update(project_id: number, items: InvoiceModel[], total: number | undefined = undefined) {
        let item = this.items.get(project_id);
        if (!item) {
            item = {
                total: total === undefined ? -1 : total,
                items: new Map<number, InvoiceModel>()
            }
        }

        if (total !== undefined) {
            item.total = total;
        }

        for (const i of items) {
            item.items.set(i.id, i);
        }
        this.items.set(project_id, item);
    }

    getTotal(project_id: number): number {
        const item = this.items.get(project_id);

        if (!item) {
            return -1;
        }
        return item.total;
    }

    query(project_id: number, predicate: (it: InvoiceModel) => boolean): InvoiceModel[] {
        const result: InvoiceModel[] = [];
        if (!this.items.has(project_id)) {
            return result;
        }

        this.items.get(project_id)!.items.forEach((item) => {
            if (predicate(item))
                result.push(item);
        });
        return result;
    }

    getById(project_id: number, id: number): InvoiceModel | undefined {
        if (!this.items.has(project_id)) {
            return undefined;
        }
        return this.items.get(project_id)!.items.get(id);
    }

    isLoaded(project_id: number): boolean {
        const obj = this.items.get(project_id);
        if (!obj) {
            return false;
        }
        return obj.items.size === obj.total && obj.total !== -1;
    }

    queryAll(project_id: number) {
        return this.query(project_id, () => true);
    }

    clear() {
        this.items.clear();
    }
}