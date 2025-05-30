import { 
    BadRequestException,
    Inject, 
    Injectable, 
    NotFoundException
} from "@nestjs/common"

import { 
    IUserRepository, 
    USER_REPOSITORY 
} from "../../domain/interfaces/user-repository.interface"
import { HashService } from "@/common/hash/hash.service"
import { SigninDto } from "../dto/signin.dto"
import { userToResponse } from "../presenter/user.presenter"

@Injectable()
export class SigninUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly repo: IUserRepository,
        private readonly hashProvider: HashService
    ) {}

    async execute({ email, password }: SigninDto) {
        const user = await this.repo.findOne({ where: { email } })

        if(!user)
            throw new NotFoundException(`E-mail ${email} não encontrado`)

        const hashPasswordMatch = await this.hashProvider.compare(password, user.password)

        if(!hashPasswordMatch)
            throw new BadRequestException("Senha está incorreto")

        return userToResponse(user)
    }
}