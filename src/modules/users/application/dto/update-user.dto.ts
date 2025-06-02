import {
    IsArray,
    IsDateString,
    IsEmail,
    IsEnum,
    IsOptional,
    IsString,
    Matches,
    ValidateNested
} from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

import { AddressDto } from "./address.dto"
import { Gender } from "../../domain/enums/gender.enum"
import { UserType } from "../../domain/enums/user-type.enum"
import { Type } from "class-transformer"

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

    @ApiProperty({ example: "1990-01-01", required: false })
    @IsOptional()
    @IsDateString()
    birthDate?: string

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