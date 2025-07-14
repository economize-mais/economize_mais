import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { BaseRepository } from "@/common/base/base.repository"
import { IUserRepository } from "../../domain/interfaces/user-repository.interface"
import { User } from "@/modules/users/domain/entities/users.entity"

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {

    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>
    ) {
        super(repo)
    }

    async isEmailTaken(email: string): Promise<boolean> {
        const user = await this.repo.findOne({ where: { email } })
        return !!user
    }

    async isCpfCnpjTaken(cpfCnpj: any): Promise<boolean> {
        const user = await this.repo.findOne({ where: { cpfCnpj } })
        return !!user
    }
}