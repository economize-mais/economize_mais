import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException
} from "@nestjs/common"

import { Product } from "../../domain/entities/product.entity"
import {
    IProductRepository,
    PRODUCTS_REPOSITORY
} from "../../domain/interfaces/product-repository.interface"
import { ProductValidator } from "../../domain/validator/product.validator"

import { UpdateProductDto } from "../dto/update-product.dto"

@Injectable()
export class UpdateProductUseCase {
    constructor(
        @Inject(PRODUCTS_REPOSITORY)
        private readonly productsRepo: IProductRepository
    ) {}

    async execute(
        id: string,
        establishmentId: string,
        dto: UpdateProductDto
    ): Promise<Product> {
        const product = await this.productsRepo.findOne({
            where: {
                id,
                establishmentId
            }
        })

        if (!product) throw new NotFoundException("Produto não encontrado")

        product.categoryId = dto.categoryId ?? product.categoryId
        product.name = dto.name ?? product.name

        const priceOriginal = dto.originalPrice ?? product.priceOriginal
        const priceOffer = dto.offerPrice ?? product.priceOffer

        if (priceOffer > priceOriginal)
            throw new BadRequestException(
                "O preço de oferta não pode ser maior que o preço original"
            )

        product.priceOriginal = priceOriginal
        product.priceOffer = priceOffer
        product.discountPercent = this.calculateDiscountPercent(
            priceOriginal,
            priceOffer
        )

        product.productExpirationDate =
            dto.productExpirationDate ?? product.productExpirationDate
        product.offerStartDate = dto.offerStartDate ?? product.offerStartDate
        product.offerExpiration = dto.offerExpiration ?? product.offerExpiration

        ProductValidator.validate(product)

        product.imageUrl = dto.imageUrl ?? product.imageUrl

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
