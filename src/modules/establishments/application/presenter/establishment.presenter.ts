import { plainToInstance } from "class-transformer"

import { AddressDto } from "@/modules/shared/dto/address.dto"

import { Establishment } from "../../domain/entities/establishment.entity"
import { EstablishmentResponseDto } from "../dto/establishment-response.dto"

type Terms = {
    usage: boolean
    privacy: boolean
}

export const establishmentToResponse = (
    establishment: Establishment,
    terms: Terms
): EstablishmentResponseDto => {
    const dto = new EstablishmentResponseDto()

    dto.id = establishment.id
    dto.type = establishment.type
    dto.companyName = establishment.companyName
    dto.tradeName = establishment.tradeName
    dto.email = establishment.email
    dto.cnpj = establishment.cnpj
    dto.phone = establishment.phone
    dto.logoUrl = establishment.logoUrl
    dto.addresses = plainToInstance(AddressDto, establishment.addresses, {
        excludeExtraneousValues: true
    })
    dto.termsAcceptance = terms
    dto.originAcceptance = true

    return dto
}
