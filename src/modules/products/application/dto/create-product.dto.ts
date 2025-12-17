import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import {
    IsDateString,
    IsNotEmpty,
    IsNumber,
    IsOptional,
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

    @ApiProperty({
        example: "Maçã Fuji",
        description: "Nome do produto"
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        example: 10.99,
        description: "Preço original"
    })
    @IsNumber()
    @IsNotEmpty()
    originalPrice: number

    @ApiProperty({
        example: 8.99,
        description: "Preço com desconto"
    })
    @IsNumber()
    @IsNotEmpty()
    offerPrice: number

    @ApiProperty({
        example: "2025-11-15",
        description: "Data de início da oferta (pode ser futura)"
    })
    @IsDateString()
    @IsNotEmpty()
    offerStartDate: Date

    @ApiProperty({
        example: "2025-12-10",
        description: "Data de término da oferta"
    })
    @IsDateString()
    @IsNotEmpty()
    offerExpiration: Date

    @ApiPropertyOptional({
        example: "2025-12-20",
        description: "Data de validade do produto (opcional)"
    })
    @IsDateString()
    @IsOptional()
    productExpirationDate?: Date

    @ApiProperty({
        example: "https://.../products/123.jpg",
        description: "URL da imagem do produto"
    })
    @IsString()
    @IsNotEmpty()
    imageUrl: string
}
