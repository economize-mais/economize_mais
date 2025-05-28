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

    async create<D extends DeepPartial<T>>(data: D): Promise<T> {
        const entity = this.repository.create(data)
        return this.repository.save(entity)
    }

    async find(): Promise<T[]> {
        return this.repository.find()
    }

    async findOne(options: FindOneOptions<T>): Promise<T | null> {
        return this.repository.findOne(options)
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        await this.repository.update(id, data as any)
        return this.findOne({ where: { id } as any })
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id)
    }
}