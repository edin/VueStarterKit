export type FuncKeySelector<T, K> = (item: T) => K;
export type FuncComparator<T> = (a: T, b: T) => number;
export type FuncMapper<T, U> = (item: T) => U;

export class Group<K = any, T = any> {
    readonly key: K;
    readonly items: T[];
    public constructor(key: K, items: T[]) {
        this.key = key;
        this.items = items;
    }
}

export class Collection<T = any> {
    public constructor(public items: T[]) {
        if (!Array.isArray(items)) {
            this.items = [];
        }
    }

    public map<U = any>(mapper: FuncMapper<T, U>) {
        return new Collection(this.items.map(mapper));
    }

    public static from<T = any>(items: T[]) {
        return new Collection(items);
    }

    public unique<K = any>(keySelector: FuncKeySelector<T, K>): Collection<T> {
        const items: T[] = [];
        for (let item of this.items) {
            if (item) {
                try {
                    const key = keySelector(item);
                    const element = items.find(g => keySelector(g) === key);
                    if (!element) {
                        items.push(item);
                    }
                } catch (e) { console.error(item, e) }
            }
        }
        return new Collection(items);
    }

    public groupBy<K = any>(keySelector: FuncKeySelector<T, K>) {
        const groups: Array<Group<K, T>> = [];
        for (let item of this.items) {
            const key = keySelector(item);
            const group = groups.find(g => g.key === key);
            if (group) {
                group.items.push(item);
            } else {
                groups.push(new Group(key, [item]));
            }
        }
        return new Collection(groups);
    }

    public orderByProperty(property: string, ascending: boolean = true) {
        return this.orderBy(Collection.orderBy(property, ascending));
    }

    public orderBy(comparator: FuncComparator<T>): Collection<T> {
        const result = [...this.items];
        result.sort(comparator)
        return new Collection(result);
    }

    public all(): T[] {
        return this.items;
    }

    public firstOrNull(): T | null {
        if (this.items.length > 0) {
            return this.items[0];
        }
        return null;
    }

    public lastOrNull(): T | null {
        if (this.items.length > 0) {
            this.items[this.items.length - 1];
        }
        return null;
    }

    static orderBy(property: string, ascending: boolean = true): FuncComparator<any> {
        const isObject = (o: any) => (typeof o === "object" && o !== null)

        const compare = (a: any, b: any) => {
            if (a > b) return -1;
            if (a < b) return 1;
            return 0;
        }

        return function (a: any, b: any): number {
            if (isObject(a) && isObject(b)) {
                const propA = a[property] ?? null;
                const propB = b[property] ?? null;

                if (propA != null && propB != null) {
                    let result = compare(propA, propB)
                    if (ascending) {
                        result = result * -1;
                    }
                    return result;
                }
            }
            return 0;
        }
    }
}
