import { ApiProperty } from "@nestjs/swagger"

import { AddressDto } from "@/modules/shared/dto/address.dto"
import { UserType } from "@/modules/shared/enums/user-type.enum"
import { TermsAcceptance } from "@/modules/users/application/dto/terms-acceptance.dto"

export class EstablishmentResponseDto {
    @ApiProperty({ example: "d290f1ee-6c54-4b01-90e6-d701748f0851" })
    id: string

    @ApiProperty({ enum: UserType })
    type: UserType

    @ApiProperty({ example: "Supermercado Economize Mais" })
    companyName: string

    @ApiProperty({ example: "Economize Mais" })
    tradeName: string

    @ApiProperty({ example: "user@example.com" })
    email: string

    @ApiProperty({ example: "12345678000100" })
    cnpj: string

    @ApiProperty({ example: "(35)99942-1613", maxLength: 20 })
    phone?: string

    @ApiProperty({ example: "https://example.com/logo.png", required: false })
    logoUrl?: string

    @ApiProperty({ example: "eyJhbGciOiJIUzI1NiIsInR5cCI6..." })
    accessToken?: string

    @ApiProperty({ type: AddressDto, isArray: true })
    addresses?: AddressDto[]

    @ApiProperty({ type: TermsAcceptance })
    termsAcceptance: TermsAcceptance

    @ApiProperty({ example: "true" })
    originAcceptance: boolean
}
