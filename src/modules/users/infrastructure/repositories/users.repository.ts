import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { BaseRepository } from "@/common/base/base.repository"
import { User } from "@/modules/users/domain/entities/users.entity"
import { IUserRepository } from "../../domain/interfaces/user-repository.interface"

@Injectable()
export class UserRepository
    extends BaseRepository<User>
    implements IUserRepository
{
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

    async isCpfTaken(cpf: string): Promise<boolean> {
        const user = await this.repo.findOne({ where: { cpf } })
        return !!user
    }
}
