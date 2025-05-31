import { 
    DeepPartial, 
    FindOneOptions 
} from "typeorm"

export interface IBaseRepository<T> {
    create<D extends DeepPartial<T>>(data: D): Promise<T> 
    find(): Promise<T[]> 
    findOne(options: FindOneOptions<T>): Promise<T | null> 
    update(id: string, data: Partial<T>): Promise<T | null> 
    delete(id: string): Promise<void>
}