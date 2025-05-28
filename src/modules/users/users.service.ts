import { 
    Inject, 
    Injectable 
} from "@nestjs/common"

import { CreateUserDto } from "./dto/create-user.dto"
import { HashService } from "@/common/hash/hash.service"
import { IUserRepository } from "./interfaces/user-repository.interface"
import { toUserResponse } from "./mapper/user.mapper"
import { UserCreateValidator } from "./validators/user-create.validator"

@Injectable()
export class UserService {

    constructor(
        @Inject(IUserRepository)
        private readonly repo: IUserRepository,
        private readonly hashProvider: HashService,
    ) {}

    async create(data: CreateUserDto) {

        new UserCreateValidator().validate(data)
        await this.repo.emailExists(data.email)

        const hashPassoword = await this.hashProvider.hash(data.password)
        const entity = { ...data, password: hashPassoword }
        const user = await this.repo.create(entity)

        return toUserResponse(user, "")
    }
}