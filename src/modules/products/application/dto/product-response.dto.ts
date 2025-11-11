import { ApiProperty } from "@nestjs/swagger"
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
        description: "URL da imagem do produto",
        example: "https://cdn.app.com/images/products/arroz-tio-joao.jpg"
    })
    @Expose({ name: "image_url" })
    imageUrl: string

    @ApiProperty({
        description: "Data de expiração da oferta",
        example: "2025-11-12"
    })
    @Expose({ name: "offer_expiration" })
    offerExpiration: Date
}
