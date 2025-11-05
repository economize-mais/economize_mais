import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsOptional, IsString, IsUUID } from "class-validator"

import { EstablishmentSummaryResponse } from "./establishment-summary.response"

export class EstablishmentTypeResponse {
    @ApiProperty({
        description: "Identificador único do tipo de estabelecimento",
        example: "f7a0e84d-23ad-4c3a-8e3a-23f11b52b7f5"
    })
    @IsUUID()
    id: string

    @ApiProperty({
        description: "Nome do tipo de estabelecimento",
        example: "Supermercados"
    })
    @IsString()
    name: string

    @ApiProperty({
        description: "Descrição opcional do tipo",
        example: "Ofertas e promoções em mercados da sua cidade",
        required: false
    })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({
        description: "Lista de estabelecimentos vinculados a este tipo",
        type: [EstablishmentSummaryResponse]
    })
    @IsArray()
    establishments: EstablishmentSummaryResponse[]
}
