import { CategoryProductsResponseDto } from "../dto/category-products-response.dto"
import { ProductResponseDto } from "../dto/product-response.dto"

export const categoryProductsToResponse = (
    id: string,
    name: string,
    products: ProductResponseDto[]
): CategoryProductsResponseDto => {
    const dto = new CategoryProductsResponseDto()

    dto.categoryId = id
    dto.categoryName = name
    dto.products = products

    return dto
}
