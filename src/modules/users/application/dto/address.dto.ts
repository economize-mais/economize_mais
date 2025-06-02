import { 
    IsNotEmpty,
    IsOptional, 
    IsString, 
    IsUUID, 
    Length
} from "class-validator"
import { Expose } from "class-transformer"

import { ApiProperty } from "@nestjs/swagger"

export class AddressDto {
    
    @ApiProperty({ example: "342db863-f729-4c25-98dd-f313f19cb525" })
    @IsOptional()
    @IsUUID(4)
    @Expose()
    id?: string
    
    @ApiProperty({ example: "Avenida Paulista" })
    @IsString()
    @IsNotEmpty()
    @Expose()
    street: string

    @ApiProperty({ example: "1500" })
    @IsOptional()
    @IsString()
    @Expose()
    number: string

    @ApiProperty({ example: "Bela Vista" })
    @IsOptional()
    @IsString()
    @Expose()
    neighborhood?: string

    @ApiProperty({ example: "São Paulo" })
    @IsNotEmpty()
    @IsString()
    @Expose()
    city: string

    @ApiProperty({ example: "SP", maxLength: 2 })
    @IsNotEmpty()
    @IsString()
    @Length(2, 2, { message: "O campo 'state' deve conter exatamente 2 caracteres" })
    @Expose()
    state: string

    @ApiProperty({ example: "Apto 101" })
    @IsOptional()
    @IsString()
    @Expose()
    complement?: string

    @ApiProperty({ example: "01310-001", maxLength: 10 })
    @IsNotEmpty()
    @IsString()
    @Expose()
    zipcode: string
}