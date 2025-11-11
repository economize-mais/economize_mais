import { Inject, Injectable } from "@nestjs/common"

import {
    IProductRepository,
    PRODUCTS_REPOSITORY
} from "../../domain/interfaces/product-repository.interface"

import { CategoryProductsResponseDto } from "../dto/category-products-response.dto"

import { categoryProductsToResponse } from "../presenter/category-products.presenter"
import { productsToResponse } from "../presenter/products.presenter"

@Injectable()
export class GetProductsUseCase {
    constructor(
        @Inject(PRODUCTS_REPOSITORY)
        private readonly productsRepo: IProductRepository
    ) {}

    async getProductsByEstablishment(
        establishmentId: string
    ): Promise<CategoryProductsResponseDto[]> {
        const products =
            await this.productsRepo.getProductsByEstablishment(establishmentId)

        return Object.entries(products).map(([category, products]) => {
            return categoryProductsToResponse(
                products[0].category.id,
                category,
                products.map((product) => {
                    return productsToResponse(product)
                })
            )
        })
    }
}
