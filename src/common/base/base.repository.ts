import { 
    DeepPartial,
    FindOneOptions, 
    Repository 
} from "typeorm"

import { IBaseRepository } from "./interfaces/base-repository.interface"

export abstract class BaseRepository<T> implements IBaseRepository<T> {
    protected constructor(
        protected readonly repository: Repository<T>
    ) {}

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }

    async find(): Promise<T[]> {
        return this.repository.find()
    }

    async findOne(options: FindOneOptions<T>): Promise<T | null> {
        return this.repository.findOne(options)
    }

    async save<D extends DeepPartial<T>>(data: D): Promise<T> {
        const entity = this.repository.create(data)
        return this.repository.save(entity)
    }
}