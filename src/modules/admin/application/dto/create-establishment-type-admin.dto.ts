import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsInt, IsOptional, IsString, Min } from "class-validator"

export class CreateEstablishmentTypeAdminDto {
    @ApiProperty({ example: "Supermercado" })
    @IsString()
    name: string

    @ApiProperty({ example: "Estabelecimentos de grande porte" })
    @IsString()
    description: string

    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(0)
    displayOrder: number

    @ApiProperty({ example: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean
}
