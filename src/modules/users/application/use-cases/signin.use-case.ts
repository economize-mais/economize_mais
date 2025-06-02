import { 
    BadRequestException,
    Inject, 
    Injectable, 
    NotFoundException
} from "@nestjs/common"

import { 
    AUTH_SERVICE, 
    IAuthService 
} from "@/auth/infrastructure/interfaces/auth-service.interface"
import { 
    HASH_SERVICE, 
    IHashService 
} from "@/common/hash/interfaces/hash-service.interface"
import { 
    IUserRepository, 
    USER_REPOSITORY 
} from "../../domain/interfaces/user-repository.interface"
import { SigninDto } from "../dto/signin.dto"
import { userToResponse } from "../presenter/user.presenter"

@Injectable()
export class SigninUseCase {
    
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly authService: IAuthService,
        @Inject(HASH_SERVICE)
        private readonly hashProvider: IHashService,
        @Inject(USER_REPOSITORY)
        private readonly repo: IUserRepository
    ) {}

    async execute({ email, password }: SigninDto) {
        const user = await this.repo.findOne({ where: { email } })

        if(!user)
            throw new NotFoundException(`E-mail ${email} não encontrado`)

        const hashPasswordMatch = await this.hashProvider.compare(password, user.password)

        if(!hashPasswordMatch)
            throw new BadRequestException("Senha está incorreto")

        const output = userToResponse(user)
        output.accessToken = await this.authService.generateJwt({ sub: user.id, email: user.email })

        return output
    }
}