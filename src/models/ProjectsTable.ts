import {action, makeObservable, observable} from "mobx";
import {ProjectModel} from "./ProjectModel";

export class ProjectsTable {
    items:Map<number, ProjectModel> = new Map<number, ProjectModel>();
    total = -1;

    constructor() {
        makeObservable(this, {
            items: observable,
            total: observable,
            clear: action,
            update: action,
        });
    }

    update(items: ProjectModel[], total: number | undefined = undefined) {
        if (total)
            this.total = total;

        for (const i of items) {
            this.items.set(i.id, i);
        }
    }

    query(predicate: (it: ProjectModel) => boolean): ProjectModel[] {
        const result: ProjectModel[] = [];
        this.items.forEach((item) => {
            if (predicate(item))
                result.push(item);
        });
        return result;
    }

    getById(id: number): ProjectModel | undefined {
        return this.items.get(id);
    }

    queryAll() {
        return this.query(() => true);
    }

    clear() {
        this.items.clear();
    }
    get loaded(): boolean {
        return this.total !== -1 && this.items.size === this.total;
    }
}