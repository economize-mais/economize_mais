import { IBaseRepository } from "@/common/base/interfaces/base-repository.interface"

import { UserOrigin } from "../entities/user-origin.entity"

export const USER_ORIGIN_REPOSITORY = Symbol("USER_ORIGIN_REPOSITORY")

export interface IUserOriginRepository extends IBaseRepository<UserOrigin> {}
