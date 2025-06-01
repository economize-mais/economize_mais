export const HASH_SERVICE = Symbol("HASH_SERVICE")

export interface IHashService {
    hash(password: string): Promise<string>
    compare(password: string, hashed: string): Promise<boolean>
}