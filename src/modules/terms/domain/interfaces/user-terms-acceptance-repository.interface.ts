import { IBaseRepository } from "@/common/base/interfaces/base-repository.interface"
import { UserTermsAcceptance } from "../entities/user-terms-acceptance.entity"

export const USER_TERMS_ACCEPTANCE_REPOSITORY = Symbol(
    "USER_TERMS_ACCEPTANCE_REPOSITORY"
)

export interface IUserTermsAcceptanceRepository
    extends IBaseRepository<UserTermsAcceptance> {}
