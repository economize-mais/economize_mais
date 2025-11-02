import { Inject, Injectable, NotFoundException } from "@nestjs/common"

import {
    IOriginRepository,
    ORIGIN_REPOSITORY
} from "../../domain/interfaces/origin-repository.interface"
import {
    IUserOriginRepository,
    USER_ORIGIN_REPOSITORY
} from "../../domain/interfaces/user-origin-repository.interface"

@Injectable()
export class AcceptOriginUseCase {
    constructor(
        @Inject(ORIGIN_REPOSITORY)
        private readonly origin: IOriginRepository,
        @Inject(USER_ORIGIN_REPOSITORY)
        private readonly userOrigin: IUserOriginRepository
    ) {}

    async execute(userId: string, originId: number) {
        const origin = await this.origin.findOne({ where: { id: originId } })

        if (!origin) throw new NotFoundException(`Origem não encontrada`)

        if (await this.userOrigin.findOne({ where: { userId, originId } }))
            return {
                message: "Onde nos encontrou já informado"
            }

        if (await this.userOrigin.save({ userId, originId }))
            return {
                message: "Onde nos encontrou salvo com sucesso"
            }

        throw new NotFoundException("Não foi possível salvar origem")
    }
}
