import { ApiProperty, OmitType } from "@nestjs/swagger"
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
import { AddressDto } from "@/modules/shared/dto/address.dto"

import { UserType } from "../../../shared/enums/user-type.enum"
import { Gender } from "../../domain/enums/gender.enum"

export class CreateUserDto {
    @ApiProperty({ enum: UserType })
    @IsEnum(UserType)
    type: UserType

    @ApiProperty({ example: "John Doe", required: false })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ example: "user@example.com" })
    @IsEmail()
    email: string

    @ApiProperty({ example: "strongPassword123" })
    @IsNotEmpty({ message: "nome do usuário é obrigatório" })
    @IsString()
    password: string

    @ApiProperty({ example: "12345678901" })
    @IsString()
    @Matches(/^\d{11}$/, {
        message: "CPF deve ter 11 digitos"
    })
    cpf: string

    @ApiProperty({ example: "(35)99942-1613", maxLength: 20 })
    @IsString()
    @MaxLength(20, { message: "O telefone deve ter no máximo 20 caracteres" })
    phone: string

    @ApiProperty({
        description: "Data de nascimento do usuário (YYYY-MM-DD)",
        example: "1990-01-01"
    })
    @IsDate({ message: "A data de nascimento deve ser uma data válida" })
    @IsNotEmpty({ message: "A data de nascimento é obrigatória" })
    @Transform(({ value }) => startOfDayInTimezone(value))
    birthDate: Date

    @ApiProperty({ enum: Gender, required: false })
    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender

    @ApiProperty({ type: OmitType(AddressDto, ["id"] as const), isArray: true })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    addresses?: AddressDto[]
}
