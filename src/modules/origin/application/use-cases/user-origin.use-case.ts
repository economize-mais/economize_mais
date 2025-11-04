import { Inject, Injectable, NotFoundException } from "@nestjs/common"

import { UserType } from "@/modules/shared/enums/user-type.enum"
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

    async execute(type: string, user_id: string, origin_id: number) {
        if (type === UserType.COMPANY) return

        const origin = await this.origin.findOne({ where: { id: origin_id } })

        if (!origin) throw new NotFoundException(`Origem não encontrada`)

        if (
            await this.userOrigin.findOne({
                where: { user_id, origin_id }
            })
        )
            return {
                message: "Onde nos encontrou já informado"
            }

        if (await this.userOrigin.save({ user_id, origin_id }))
            return {
                message: "Onde nos encontrou salvo com sucesso"
            }

        throw new NotFoundException("Não foi possível salvar origem")
    }
}
