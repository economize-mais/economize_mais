import { 
    ConflictException,
    Inject, 
    Injectable 
} from "@nestjs/common"

import { CreateUserDto } from "../dto/create-user.dto"
import { HashService } from "@/common/hash/hash.service"
import { IUserRepository, USER_REPOSITORY } from "../../domain/interfaces/user-repository.interface"
import { UserCreateValidator } from "../../domain/validators/user-create.validator"
import { userToResponse } from "../presenter/user.presenter"

@Injectable()
export class CreateServiceUseCase {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly repo: IUserRepository,
        private readonly hashProvider: HashService,
    ) {}

    async execute(data: CreateUserDto) {

        new UserCreateValidator().validate(data)
        
        if(await this.repo.isEmailTaken(data.email))
            throw new ConflictException(`Email ${data.email} já está em uso`)

        const hashPassoword = await this.hashProvider.hash(data.password)
        const entity = { ...data, password: hashPassoword }
        const user = await this.repo.create(entity)

        return userToResponse(user)
    }
}