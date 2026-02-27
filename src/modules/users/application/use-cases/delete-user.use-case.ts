import { Inject, Injectable, NotFoundException } from "@nestjs/common"

import {
    IUserRepository,
    USER_REPOSITORY
} from "../../domain/interfaces/user-repository.interface"

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: IUserRepository
    ) {}

    async execute(id: string): Promise<void> {
        const user = await this.userRepo.findOne({
            where: {
                id
            }
        })

        if (!user) throw new NotFoundException("Usuário não encontrado")

        await this.userRepo.delete(user.id)
    }
}
