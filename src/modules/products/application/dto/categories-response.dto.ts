import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"

export class CategoriesResponseDto {
    @ApiProperty({
        description: "Identificador único do produto",
        example: "9b36c36c-bf0c-4912-800d-046831d4b1db"
    })
    @Expose()
    id: string

    @ApiProperty({
        description: "Nome do categoria",
        example: "Carnes"
    })
    @Expose()
    name: string
}
