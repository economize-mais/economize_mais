import { 
    ConflictException, 
    Injectable 
} from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { BaseRepository } from "@/common/base/base.repository"
import { IUserRepository } from "./interfaces/user-repository.interface"
import { User } from "@/database/models/users.entity"

@Injectable()
export class UserRepository extends BaseRepository<User> implements IUserRepository {

    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>
    ) {
        super(repo)
    }

    async emailExists(email: string): Promise<void> {
        const user = await this.repo.findOne({ where: { email } })
        if (user)
            throw new ConflictException(`Email ${email} já está em uso`)
    }
}