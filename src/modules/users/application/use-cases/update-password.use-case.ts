import { 
    Inject, 
    Injectable, 
    NotFoundException, 
    UnprocessableEntityException
} from "@nestjs/common"

import { 
    IUserRepository, 
    USER_REPOSITORY 
} from "../../domain/interfaces/user-repository.interface"
import { HashService } from "@/common/hash/hash.service"
import { UpdatePasswordDto } from "../dto/update-password.dto"
import { userToResponse } from "../presenter/user.presenter"

@Injectable()
export class UpdatePasswordUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly repo: IUserRepository,
        private readonly hashProvider: HashService,
    ) {}

    async execute(id: string, updatePasswordDto: UpdatePasswordDto) {
        const user = await this.repo.findOne({ where: { id } })

        if(!user)
            throw new NotFoundException(`UserModel not found using ID ${id}`)

        const isPasswordValid = await this.hashProvider.compare(updatePasswordDto.oldPassword, user.password)
        
        if (!isPasswordValid)
            throw new UnprocessableEntityException("Password atual está incorreto")

        const hashedNewPassword = await this.hashProvider.hash(updatePasswordDto.newPassword)
        user.password = hashedNewPassword
        return userToResponse(await this.repo.update(id, user))   
    }
}