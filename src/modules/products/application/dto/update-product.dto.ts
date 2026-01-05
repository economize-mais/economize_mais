import { ApiPropertyOptional } from "@nestjs/swagger"
import {
    IsBoolean,
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
        example: "1.5",
        description: "Peso do produto"
    })
    @IsNumber()
    @IsOptional()
    weight?: number

    @ApiPropertyOptional({
        example: "LT",
        description: "unidade de medida do peso do produto"
    })
    @IsString()
    @IsOptional()
    unitOfMeasure?: string

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
        example: "2025-11-15",
        description: "Data de início da oferta"
    })
    @IsDateString()
    @IsOptional()
    offerStartDate?: Date

    @ApiPropertyOptional({
        example: "2025-12-10",
        description: "Data de término da oferta"
    })
    @IsDateString()
    @IsOptional()
    offerExpiration?: Date

    @ApiPropertyOptional({
        example: "false",
        description: "Flag para dizer se o produto tem validade"
    })
    @IsBoolean()
    @IsOptional()
    productHasExpirationDate?: boolean

    @ApiPropertyOptional({
        example: "2025-12-20",
        description: "Data de validade do produto"
    })
    @IsDateString()
    @IsOptional()
    productExpirationDate?: Date

    @ApiPropertyOptional({
        example: "https://.../products/123.jpg",
        description: "URL da imagem"
    })
    @IsString()
    @IsOptional()
    imageUrl?: string
}
