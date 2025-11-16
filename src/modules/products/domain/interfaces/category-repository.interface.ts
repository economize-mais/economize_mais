import { IBaseRepository } from "@/common/base/interfaces/base-repository.interface"

import { Category } from "../entities/category.entity"

export const CATEGORY_REPOSITORY = Symbol("CATEGORY_REPOSITORY")

export interface ICategoryRepository extends IBaseRepository<Category> {
    getAllDisplayOrderBy(): Promise<Category[]>
}
