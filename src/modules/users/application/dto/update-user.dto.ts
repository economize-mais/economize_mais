import { ApiProperty } from "@nestjs/swagger"
import { Transform, Type } from "class-transformer"
import {
    IsArray,
    IsDate,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    ValidateNested
} from "class-validator"

import { startOfDayInTimezone } from "@/common/utils/date.utils"

import { AddressDto } from "./address.dto"

import { Gender } from "../../domain/enums/gender.enum"
import { UserType } from "../../domain/enums/user-type.enum"

export class UpdateUserDto {
    id?: string

    @ApiProperty({ example: "user@example.com" })
    @IsEmail()
    email: string

    @ApiProperty({ example: "John Doe", required: false })
    @IsOptional()
    @IsString()
    fullName?: string

    @ApiProperty({ example: "12345678901" })
    @IsString()
    @Matches(/^\d{11,14}$/, {
        message: "CPF/CNPJ must have between 11 and 14 digits"
    })
    cpfCnpj: string

    @ApiProperty({ example: "(35)99942-1613", maxLength: 20 })
    @IsString()
    @IsOptional()
    @MaxLength(20, { message: "O telefone deve ter no máximo 20 caracteres" })
    phone?: string

    @ApiProperty({
        description: "Data de nascimento do usuário (YYYY-MM-DD)",
        example: "1990-01-01"
    })
    @IsDate({ message: "startDate deve ser uma data válida" })
    @IsOptional()
    @IsNotEmpty({ message: "A data de nascimento é obrigatória" })
    @Transform(({ value }) => startOfDayInTimezone(value))
    birthDate?: Date

    @ApiProperty({ enum: Gender, required: false })
    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender

    @ApiProperty({ enum: UserType })
    @IsEnum(UserType)
    userType: UserType

    @ApiProperty({ example: "Supermercado Bom Preço", required: false })
    @IsOptional()
    @IsString()
    companyName?: string

    @ApiProperty({ example: "Bom Preço", required: false })
    @IsOptional()
    @IsString()
    tradeName?: string

    @ApiProperty({ example: "https://example.com/logo.png", required: false })
    @IsOptional()
    @IsString()
    logoUrl?: string

    @ApiProperty({ type: AddressDto, isArray: true })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    addresses?: AddressDto[]
}
