import { Product } from "../../domain/entities/product.entity"
import { ProductResponseDto } from "../dto/product-response.dto"

export const productsToResponse = (product: Product): ProductResponseDto => {
    const dto = new ProductResponseDto()

    dto.id = product.id
    dto.name = product.name
    dto.description = product.description
    dto.priceOriginal = product.priceOriginal
    dto.priceOffer = product.priceOffer
    dto.discountPercent = product.discountPercent
    dto.offerStartDate = product.offerStartDate
    dto.offerExpiration = product.offerExpiration
    dto.productExpirationDate = product.productExpirationDate
    dto.imageUrl = product.imageUrl

    return dto
}
