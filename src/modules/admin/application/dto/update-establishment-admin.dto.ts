import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import {
    IsArray,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    ValidateNested
} from "class-validator"

import { AddressDto } from "@/modules/shared/dto/address.dto"

export class UpdateEstablishmentAdminDto {
    @ApiProperty({ example: "Supermercado Economize Mais", required: false })
    @IsOptional()
    @IsString()
    companyName?: string

    @ApiProperty({ example: "Economize Mais", required: false })
    @IsOptional()
    @IsString()
    tradeName?: string

    @ApiProperty({ example: "(35)99942-1613", required: false })
    @IsOptional()
    @IsString()
    @MaxLength(20)
    phone?: string

    @ApiProperty({
        example: "https://s3.amazonaws.com/logos/logo.png",
        required: false
    })
    @IsOptional()
    @IsString()
    logoUrl?: string

    @ApiProperty({
        type: String,
        required: false,
        description: "ID do tipo de estabelecimento"
    })
    @IsOptional()
    @IsUUID(4)
    typeId?: string

    @ApiProperty({ type: [AddressDto], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    addresses?: AddressDto[]
}
