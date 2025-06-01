import { 
    DeepPartial, 
    FindOneOptions 
} from "typeorm"

export interface IBaseRepository<T> {
    delete(id: string): Promise<void>
    find(): Promise<T[]> 
    findOne(options: FindOneOptions<T>): Promise<T | null> 
    save<D extends DeepPartial<T>>(data: D): Promise<T> 
}