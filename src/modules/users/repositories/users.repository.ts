import { 
    DeepPartial, 
    Repository 
} from "typeorm"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"

import { BaseRepository } from "@/common/base/base.repository"
import { HashService } from "@/common/hash/hash.service"
import { User } from "@/database/models/users.entity"

@Injectable()
export class UserRepository extends BaseRepository<User> {

    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
        private readonly hashProvider: HashService
    ) {
        super(repo)
    }

    override async create<D extends DeepPartial<User>>(data: D): Promise<User> {
        const hashPassoword = await this.hashProvider.hash(data.password)
        const user = { ...data, password: hashPassoword }
        return this.repo.save(this.repo.create(user))
    }
}