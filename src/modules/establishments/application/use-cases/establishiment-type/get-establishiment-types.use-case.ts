import { Inject, Injectable } from "@nestjs/common"

import {
    ESTABLISHMENT_TYPE_REPOSITORY,
    IEstablishmentTypeRepository
} from "@/modules/establishments/domain/interfaces/establishment-type/establishment-type-repository.interface"

import { EstablishmentSummaryResponse } from "../../dto/establishiment-type/establishment-summary.response"
import { EstablishmentTypeResponse } from "../../dto/establishiment-type/get-establishment-types.response"

@Injectable()
export class EstablishmentTypesUseCase {
    constructor(
        @Inject(ESTABLISHMENT_TYPE_REPOSITORY)
        private readonly repo: IEstablishmentTypeRepository
    ) {}

    async execute(): Promise<EstablishmentTypeResponse[]> {
        const types = await this.repo.getAllActiveTypesWithEstablishments()

        return types.map((t) => {
            const dto = new EstablishmentTypeResponse()
            dto.id = t.id
            dto.name = t.name
            dto.description = t.description
            dto.establishments = t.typeLinks
                .sort(
                    (a, b) =>
                        a.establishment.displayOrder -
                        b.establishment.displayOrder
                )
                .map((item) => {
                    const dto = new EstablishmentSummaryResponse()
                    dto.id = item.establishment.id
                    dto.name = item.establishment.tradeName
                    dto.street = `${item.establishment.addresses[0].street}, ${item.establishment.addresses[0].number}`
                    dto.logoUrl = item.establishment.logoUrl
                    dto.displayOrder = item.establishment.displayOrder
                    return dto
                })
            return dto
        })
    }
}
