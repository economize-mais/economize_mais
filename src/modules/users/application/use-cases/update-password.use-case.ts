import { 
    Inject, 
    Injectable, 
    NotFoundException, 
    UnprocessableEntityException
} from "@nestjs/common"

import { 
    HASH_SERVICE, 
    IHashService 
} from "@/common/hash/interfaces/hash-service.interface"
import { 
    IUserRepository, 
    USER_REPOSITORY 
} from "../../domain/interfaces/user-repository.interface"
import { PasswordValidator } from "../../domain/validators/password.validator"
import { UpdatePasswordDto } from "../dto/update-password.dto"
import { userToResponse } from "../presenter/user.presenter"

@Injectable()
export class UpdatePasswordUseCase {
    
    constructor(
        @Inject(HASH_SERVICE)
        private readonly hashProvider: IHashService,
        @Inject(USER_REPOSITORY)
        private readonly repo: IUserRepository
    ) {}

    async execute(id: string, updatePasswordDto: UpdatePasswordDto) {

        const user = await this.repo.findOne({ where: { id } })

        if(!user)
            throw new NotFoundException(`id ${id} não encontrado`)

        const isPasswordValid = await this.hashProvider.compare(updatePasswordDto.oldPassword, user.password)

        if (!isPasswordValid)
            throw new UnprocessableEntityException("Senha está incorreto")

        PasswordValidator.validate(updatePasswordDto.newPassword, true)

        if(await this.hashProvider.compare(updatePasswordDto.newPassword, user.password))
            throw new UnprocessableEntityException("A nova senha não pode ser igual a senha atual")

        const hashedNewPassword = await this.hashProvider.hash(updatePasswordDto.newPassword)
        user.password = hashedNewPassword
        return userToResponse(await this.repo.save(user), { usage: true, privacy: true })   
    }
}