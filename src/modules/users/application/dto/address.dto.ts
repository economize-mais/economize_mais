import { 
    IsNotEmpty,
    IsOptional, 
    IsString, 
    IsUUID 
} from "class-validator"

import { ApiProperty } from "@nestjs/swagger"

export class AddressDto {
    @ApiProperty({ example: "342db863-f729-4c25-98dd-f313f19cb525" })
    @IsOptional()
    @IsUUID(4)
    id?: string
    
    @ApiProperty({ example: "Avenida Paulista" })
    @IsString()
    @IsNotEmpty()
    street: string

    @ApiProperty({ example: "1500" })
    @IsOptional()
    @IsString()
    number: string

    @ApiProperty({ example: "Bela Vista" })
    @IsOptional()
    @IsString()
    neighborhood?: string

    @ApiProperty({ example: "São Paulo" })
    @IsNotEmpty()
    @IsString()
    city: string

    @ApiProperty({ example: "SP", maxLength: 2 })
    @IsNotEmpty()
    @IsString()
    state: string

    @ApiProperty({ example: "Apto 101" })
    @IsOptional()
    @IsString()
    complement?: string

    @ApiProperty({ example: "01310-001", maxLength: 10 })
    @IsNotEmpty()
    @IsString()
    zipcode: string
}