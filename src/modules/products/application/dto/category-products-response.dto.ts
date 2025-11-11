import { ApiProperty } from "@nestjs/swagger"
import { Expose, Type } from "class-transformer"

import { ProductResponseDto } from "./product-response.dto"

export class CategoryProductsResponseDto {
    @ApiProperty({
        description: "Identificador único da categoria",
        example: "b45e8d20-08b1-4c12-8ef0-7dcdf1a89451"
    })
    @Expose()
    categoryId: string

    @ApiProperty({
        description: "Nome da categoria",
        example: "Alimentos"
    })
    @Expose()
    categoryName: string

    @ApiProperty({
        description: "Lista de produtos pertencentes a esta categoria",
        type: [ProductResponseDto]
    })
    @Type(() => ProductResponseDto)
    @Expose()
    products: ProductResponseDto[]
}
