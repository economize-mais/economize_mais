import { IBaseRepository } from "@/common/base/interfaces/base-repository.interface"

import { Origin } from "../entities/origin.entity"

export const ORIGIN_REPOSITORY = Symbol("ORIGIN_REPOSITORY")

export interface IOriginRepository extends IBaseRepository<Origin> {}
