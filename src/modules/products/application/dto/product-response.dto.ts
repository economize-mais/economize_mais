import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Expose } from "class-transformer"

export class ProductResponseDto {
    @ApiProperty({
        description: "Identificador único do produto",
        example: "e21b5b32-4df4-4d4b-8dbb-8b7cdb03b9a9"
    })
    @Expose()
    id: string

    @ApiProperty({
        description: "Nome do produto",
        example: "Arroz Tio João 5kg"
    })
    @Expose()
    name: string

    @ApiProperty({
        example: "1.5",
        description: "Peso do produto"
    })
    @Expose()
    weight: number

    @ApiProperty({
        example: "LT",
        description: "unidade de medida do peso do produto"
    })
    @Expose({ name: "unit_of_measure" })
    unitOfMeasure: string

    @ApiPropertyOptional({
        description: "Descrição breve do produto",
        example: "Arroz branco tipo 1, pacote de 5kg"
    })
    @Expose()
    description?: string

    @ApiProperty({
        description: "Preço original do produto",
        example: 25.9,
        type: Number
    })
    @Expose({ name: "price_original" })
    priceOriginal: number

    @ApiProperty({
        description: "Preço promocional do produto",
        example: 21.5,
        type: Number
    })
    @Expose({ name: "price_offer" })
    priceOffer: number

    @ApiProperty({
        description: "Percentual de desconto aplicado",
        example: 17.1,
        type: Number
    })
    @Expose({ name: "discount_percent" })
    discountPercent: number

    @ApiProperty({
        description: "Data de início da oferta",
        example: "2025-11-15"
    })
    @Expose({ name: "offer_start_date" })
    offerStartDate: Date

    @ApiProperty({
        description: "Data de expiração da oferta",
        example: "2025-12-10"
    })
    @Expose({ name: "offer_expiration" })
    offerExpiration: Date

    @ApiPropertyOptional({
        example: "false",
        description: "Flag para dizer se o produto tem validade"
    })
    @Expose({ name: "product_has_expiration_date" })
    productHasExpirationDate?: boolean

    @ApiPropertyOptional({
        description: "Data de validade do produto (quando aplicável)",
        example: "2025-12-20"
    })
    @Expose({ name: "product_expiration_date" })
    productExpirationDate?: Date

    @ApiProperty({
        description: "URL da imagem do produto",
        example: "https://cdn.app.com/images/products/arroz-tio-joao.jpg"
    })
    @Expose({ name: "image_url" })
    imageUrl: string
}
