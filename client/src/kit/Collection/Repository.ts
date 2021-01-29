import { RestClient } from "../Rest/RestClient";
import { Entity } from "./ModelCollection";

export class Repository<T extends Entity> {

    public constructor(
        private client: RestClient,
        private path: string) {
    }

    public serialize(entity: T): any {
        return entity;
    }

    public map(data: any): T|null {
        return null;
    }

    public async findAll(query: any): Promise<any> {
        const response = await this.client.get("", {query})
    }

    public async saveRange(items: T[]): Promise<any> {
        const models = items.map((e) => this.serialize(e));
        const response = await this.client.post("", {models})
    }

    public async removeRange(items: T[]): Promise<any> {
        const models = items.map((e) => {id: e.id});
        const response = await this.client.delete("", {models})
    }

    public async remove(item: T): Promise<any> {
        return this.removeRange([item])
    }

    public async save(item: T): Promise<any> {
        return this.saveRange([item])
    }
}
