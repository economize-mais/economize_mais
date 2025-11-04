import { ApiProperty, OmitType } from "@nestjs/swagger"
import { Type } from "class-transformer"
import {
    IsArray,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    ValidateNested
} from "class-validator"

import { AddressDto } from "@/modules/shared/dto/address.dto"
import { UserType } from "@/modules/shared/enums/user-type.enum"

export class CreateEstablishmentDto {
    @ApiProperty({ enum: UserType })
    @IsEnum(UserType)
    type: UserType

    @ApiProperty({ example: "Supermercado Economize Mais" })
    @IsNotEmpty({ message: "Razão social da empresa é obrigatório" })
    @IsString()
    companyName: string

    @ApiProperty({ example: "Economize Mais" })
    @IsNotEmpty({ message: "Nome fantasia da empresa é obrigatório" })
    @IsString()
    tradeName: string

    @ApiProperty({ example: "economizemais@example.com" })
    @IsNotEmpty({ message: "Email do usuário é obrigatório" })
    @IsEmail()
    email: string

    @ApiProperty({ example: "strongPassword123" })
    @IsNotEmpty({ message: "Senha do usuário é obrigatório" })
    @IsString()
    password: string

    @ApiProperty({ example: "12345678901" })
    @IsString()
    @Matches(/^\d{14}$/, {
        message: "CNPJ deve ter 14 digitos"
    })
    cnpj: string

    @ApiProperty({ example: "(35)99942-1613", maxLength: 20 })
    @IsString()
    @MaxLength(20, { message: "O telefone deve ter no máximo 20 caracteres" })
    phone: string

    @ApiProperty({ example: "https://example.com/logo.png", required: false })
    @IsOptional()
    @IsString()
    logoUrl?: string

    @ApiProperty({ type: OmitType(AddressDto, ["id"] as const), isArray: true })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    addresses?: AddressDto[]
}
