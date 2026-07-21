import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsOptional, IsString, Min } from "class-validator"

export class UpdateEstablishmentTypeAdminDto {
    @ApiProperty({ example: "Supermercado" })
    @IsString()
    @IsOptional()
    name?: string

    @ApiProperty({ example: "Estabelecimentos de grande porte" })
    @IsString()
    @IsOptional()
    description?: string

    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(0)
    @IsOptional()
    displayOrder?: number
}
