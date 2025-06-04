import { IBaseRepository } from "@/common/base/interfaces/base-repository.interface"
import { Terms } from "../entities/terms.entity"

export const TERMS_REPOSITORY = Symbol("TERMS_REPOSITORY")

export interface ITermsRepository extends IBaseRepository<Terms> {
    findLatestByType(type: "USAGE" | "PRIVACY", userId: string): Promise<boolean>
}