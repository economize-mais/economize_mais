import { IBaseRepository } from "@/common/base/interfaces/base-repository.interface"

import { Establishment } from "../entities/establishment.entity"

export const ESTABLISHMENT_REPOSITORY = Symbol("ESTABLISHMENT_REPOSITORY")

export interface IEstablishmentRepository
    extends IBaseRepository<Establishment> {
    isEmailTaken(email: string): Promise<boolean>
    isCnpjTaken(cpf: string): Promise<boolean>
}
