import { ApiPropertyOptional } from "@nestjs/swagger"
import {
    IsDateString,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID
} from "class-validator"

export class UpdateProductDto {
    @ApiPropertyOptional({
        example: "ce18b9f7-2a4a-4b8e-bdc9-2dfb1a834e6e",
        description: "ID da categoria"
    })
    @IsUUID()
    @IsOptional()
    categoryId?: string

    @ApiPropertyOptional({
        example: "Maçã Fuji",
        description: "Nome do produto"
    })
    @IsString()
    @IsOptional()
    name?: string

    @ApiPropertyOptional({
        example: 10.99,
        description: "Preço original"
    })
    @IsNumber()
    @IsOptional()
    originalPrice?: number

    @ApiPropertyOptional({
        example: 8.99,
        description: "Preço com desconto"
    })
    @IsNumber()
    @IsOptional()
    offerPrice?: number

    @ApiPropertyOptional({
        example: "2025-12-10",
        description: "Data de validade da oferta"
    })
    @IsDateString()
    @IsOptional()
    offerExpiration?: Date

    @ApiPropertyOptional({
        example: "https://.../products/123.jpg",
        description: "URL da imagem"
    })
    @IsString()
    @IsOptional()
    imageUrl?: string
}
