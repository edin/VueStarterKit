export class Entity {
    public id: string = "";
}

export enum SortOrder {
    Asc = "ASC",
    Desc = "DESC"
}

export class EntityCollection<T> {

    private orderBy: string = "";
    private orderByDirection: SortOrder = SortOrder.Asc
    private filterBy: string = "";

    public item: T|null = null;
    public editItem: T|null = null;
    public items: T[] = [];

    public constructor(private repository: any) {
    }

    public isEditing(item: T): boolean {
        return this.editItem === item;
    }

    public isUpdating(item: T): boolean {
        return false;
    }

    public edit(item: T): void {
        this.editItem = item;
    }

    public async findAll(): Promise<any> {
        const result = await this.repository.findAll({
            orderBy: this.orderBy,
            orderByDirection: this.orderByDirection,
            filterBy: this.filterBy
        });
        //TODO: update internal collection
    }

    public async add(item: T): Promise<any> {
        const result = await this.repository.add(item);
        //TODO: update internal collection
    }

    public async save(item: T): Promise<any> {
        const result = await this.repository.save(item);
         //TODO: update internal collection
    }

    public async remove(item: T): Promise<any> {
        const result = await this.repository.remove(item);
         //TODO: update internal collection
    }

    public async saveAll(): Promise<any> {
        //TODO: Send all changes to the rest end point
        const items: any[] = [];
        const result = await this.repository.saveAll(items);
    }
}
