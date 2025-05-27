import { 
    compare, 
    hash 
} from "bcryptjs"
import { Injectable } from "@nestjs/common"

@Injectable()
export class HashService {
    
    async hash(password: string): Promise<string> {
        return hash(password, +process.env.SALT_ROUNDS)
    }

    async compare(password: string, hashed: string): Promise<boolean> {
        return compare(password, hashed)
    }
}