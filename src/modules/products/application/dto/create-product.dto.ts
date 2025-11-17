import { ApiProperty } from "@nestjs/swagger"
import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUUID
} from "class-validator"

export class CreateProductDto {
    @ApiProperty({
        example: "ce18b9f7-2a4a-4b8e-bdc9-2dfb1a834e6e",
        description: "ID da categoria"
    })
    @IsUUID()
    @IsNotEmpty()
    categoryId: string

    @ApiProperty({ example: "Maçã Fuji", description: "Nome do produto" })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: 10.99, description: "Preço original" })
    @IsNumber()
    @IsNotEmpty()
    originalPrice: number

    @ApiProperty({ example: 8.99, description: "Preço com desconto" })
    @IsNumber()
    @IsNotEmpty()
    offerPrice: number

    @ApiProperty({
        example: "2025-12-10",
        description: "Data de validade da oferta"
    })
    @IsDateString()
    @IsNotEmpty()
    offerExpiration: Date

    @ApiProperty({
        example: "https://.../products/123.jpg",
        description: "URL da imagem"
    })
    @IsString()
    @IsNotEmpty()
    imageUrl: string
}
