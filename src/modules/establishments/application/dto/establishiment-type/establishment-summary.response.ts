import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsOptional, IsString, IsUrl, IsUUID } from "class-validator"

export class EstablishmentSummaryResponse {
    @ApiProperty({
        description: "Identificador único do estabelecimento",
        example: "f59df5b4-5e0c-4b91-9e1f-1c9e8c9dc7a2"
    })
    @IsUUID()
    id: string

    @ApiProperty({
        description: "Nome do estabelecimento",
        example: "Supermercado Alvorada"
    })
    @IsString()
    name: string

    @ApiProperty({
        description: "URL da logo do estabelecimento",
        example: "https://cdn.app.com/alvorada.png",
        required: false
    })
    @IsOptional()
    @IsUrl()
    logoUrl?: string

    @ApiProperty({
        description: "Ordem de exibição dentro do tipo",
        example: 1
    })
    @IsInt()
    displayOrder: number
}
