import { Inject, Injectable, NotFoundException } from "@nestjs/common"

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

    async execute(userId: string, termsId: number) {
        const document = await this.terms.findOne({ where: { id: termsId } })

        if (!document) throw new NotFoundException(`Documento não encontrado`)

        if (
            await this.userTerms.findOne({
                where: { user_id: userId, terms_id: termsId }
            })
        )
            return {
                message: "Termo já está aceito"
            }

        if (await this.userTerms.save({ user_id: userId, terms_id: termsId }))
            return {
                message: "Termo aceito com sucesso"
            }

        throw new NotFoundException("Não foi possível aceitar o termo")
    }
}
