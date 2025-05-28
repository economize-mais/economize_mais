import { ApiProperty } from "@nestjs/swagger"

import { Gender } from "../enums/gender.enum"
import { UserType } from "../enums/user-type.enum"

export class UserResponseDto {
    @ApiProperty({ example: "d290f1ee-6c54-4b01-90e6-d701748f0851" })
    id: string

    @ApiProperty({ example: "user@example.com" })
    email: string

    @ApiProperty({ example: "John Doe", required: false })
    fullName?: string

    @ApiProperty({ enum: UserType })
    userType: UserType

    @ApiProperty({ example: "1990-01-01", required: false })
    birthDate?: Date

    @ApiProperty({ enum: Gender, required: false })
    gender?: Gender

    @ApiProperty({ example: "Supermercado Bom Preço", required: false })
    companyName?: string

    @ApiProperty({ example: "Bom Preço", required: false })
    tradeName?: string

    @ApiProperty({ example: "https://example.com/logo.png", required: false })
    logoUrl?: string

    @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..." })
    token: string
}