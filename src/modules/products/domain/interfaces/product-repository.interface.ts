import { IBaseRepository } from "@/common/base/interfaces/base-repository.interface"

import { Product } from "../entities/product.entity"

export const PRODUCTS_REPOSITORY = Symbol("PRODUCTS_REPOSITORY")

export interface IProductRepository extends IBaseRepository<Product> {
    getProductsByEstablishment(
        establishmentId: string
    ): Promise<Record<string, Product[]>>
}
