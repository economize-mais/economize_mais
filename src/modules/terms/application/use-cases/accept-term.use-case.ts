import { Inject, Injectable, NotFoundException } from "@nestjs/common"

import { UserType } from "@/modules/shared/enums/user-type.enum"

import {
    ITermsRepository,
    TERMS_REPOSITORY
} from "../../domain/interfaces/terms-repository.interface"
import {
    IUserTermsAcceptanceRepository,
    USER_TERMS_ACCEPTANCE_REPOSITORY
} from "../../domain/interfaces/user-terms-acceptance-repository.interface"

@Injectable()
export class AcceptTermUseCase {
    constructor(
        @Inject(TERMS_REPOSITORY)
        private readonly terms: ITermsRepository,
        @Inject(USER_TERMS_ACCEPTANCE_REPOSITORY)
        private readonly userTerms: IUserTermsAcceptanceRepository
    ) {}

    async execute(type: string, id: string, terms_id: number) {
        const document = await this.terms.findOne({ where: { id: terms_id } })

        if (!document) throw new NotFoundException(`Documento não encontrado`)

        const user_id = type === UserType.USER ? id : null
        const establishment_id = type === UserType.COMPANY ? id : null

        if (
            await this.userTerms.findOne({
                where: { user_id, establishment_id, terms_id: terms_id }
            })
        )
            return {
                message: "Termo já está aceito"
            }

        if (
            await this.userTerms.save({
                user_id,
                establishment_id,
                terms_id
            })
        )
            return {
                message: "Termo aceito com sucesso"
            }

        throw new NotFoundException("Não foi possível aceitar o termo")
    }
}
