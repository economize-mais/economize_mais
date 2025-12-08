import { Inject, Injectable } from "@nestjs/common"

import { Product } from "../../domain/entities/product.entity"
import {
    IProductRepository,
    PRODUCTS_REPOSITORY
} from "../../domain/interfaces/product-repository.interface"

import { CreateProductDto } from "../dto/create-product.dto"

@Injectable()
export class CreateProductUseCase {
    constructor(
        @Inject(PRODUCTS_REPOSITORY)
        private readonly productsRepo: IProductRepository
    ) {}

    async execute(establishment_id: string, data: CreateProductDto) {
        const product = new Product()

        const displayOrder = await this.productsRepo.getDisplayOrder(
            establishment_id,
            data.categoryId
        )

        product.establishmentId = establishment_id
        product.categoryId = data.categoryId
        product.name = data.name
        product.priceOriginal = data.originalPrice
        product.priceOffer = data.offerPrice

        product.discountPercent = this.calculateDiscountPercent(
            data.originalPrice,
            data.offerPrice
        )

        product.offerExpiration = data.offerExpiration
        product.imageUrl = data.imageUrl
        product.displayOrder = displayOrder

        return await this.productsRepo.save(product)
    }

    private calculateDiscountPercent(
        original: number,
        discount: number
    ): number {
        if (original <= 0) return 0
        const percent = ((original - discount) / original) * 100
        return Number(percent.toFixed(2))
    }
}
