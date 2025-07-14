import { 
    ConflictException,
    Inject, 
    Injectable 
} from "@nestjs/common"

import { 
    HASH_SERVICE, 
    IHashService 
} from "@/common/hash/interfaces/hash-service.interface"
import { 
    IUserRepository, 
    USER_REPOSITORY 
} from "../../domain/interfaces/user-repository.interface"
import { CreateUserDto } from "../dto/create-user.dto"
import { userToResponse } from "../presenter/user.presenter"
import { UserValidator } from "../../domain/validators/user.validator"

@Injectable()
export class CreateServiceUseCase {
    
    constructor(
        @Inject(HASH_SERVICE)
        private readonly hashProvider: IHashService,
        @Inject(USER_REPOSITORY)
        private readonly repo: IUserRepository
    ) {}

    async execute(data: CreateUserDto) {
        
        new UserValidator().validate(data)
        
        if(await this.repo.isEmailTaken(data.email))
            throw new ConflictException(`Email ${data.email} já está em uso`)

        if(await this.repo.isCpfCnpjTaken(data.cpfCnpj))
            throw new ConflictException(`${data.cpfCnpj.length === 11 ? "CPF" : "CNPJ"} ${data.cpfCnpj} já está em uso`)

        const hashPassoword = await this.hashProvider.hash(data.password)
        const entity = { ...data, password: hashPassoword }
        
        const user = await this.repo.save(entity)

        return userToResponse(user, { usage: false, privacy: false })
    }
}