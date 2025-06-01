import { 
    ConflictException,
    Inject, 
    Injectable 
} from "@nestjs/common"

import { 
    IUserRepository, 
    USER_REPOSITORY 
} from "../../domain/interfaces/user-repository.interface"
import { 
    HASH_SERVICE, 
    IHashService 
} from "@/common/hash/interfaces/hash-service.interface"
import { CreateUserDto } from "../dto/create-user.dto"
import { UserCreateValidator } from "../../domain/validators/user-create.validator"
import { userToResponse } from "../presenter/user.presenter"

@Injectable()
export class CreateServiceUseCase {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly repo: IUserRepository,
        @Inject(HASH_SERVICE)
        private readonly hashProvider: IHashService,
    ) {}

    async execute(data: CreateUserDto) {

        new UserCreateValidator().validate(data)
        
        if(await this.repo.isEmailTaken(data.email))
            throw new ConflictException(`Email ${data.email} já está em uso`)

        const hashPassoword = await this.hashProvider.hash(data.password)
        const entity = { ...data, password: hashPassoword }
        const user = await this.repo.save(entity)

        return userToResponse(user)
    }
}