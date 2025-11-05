import { IBaseRepository } from "@/common/base/interfaces/base-repository.interface"

import { EstablishmentTypes } from "../../entities/establishment-types.entity"

export const ESTABLISHMENT_TYPE_REPOSITORY = Symbol(
    "ESTABLISHMENT_TYPE_REPOSITORY"
)

export interface IEstablishmentTypeRepository
    extends IBaseRepository<EstablishmentTypes> {
    getAllActiveTypesWithEstablishments(): Promise<EstablishmentTypes[]>
}
