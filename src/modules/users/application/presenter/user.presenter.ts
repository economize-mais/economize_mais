import { plainToInstance } from "class-transformer"

import { Establishment } from "../../domain/entities/establishment.entity"
import { User } from "../../domain/entities/users.entity"

import { AddressDto } from "../dto/address.dto"
import { UserResponseDto } from "../dto/user-response.dto"

type Terms = {
    usage: boolean
    privacy: boolean
}

export const userToResponse = (
    user: User | Establishment,
    terms: Terms
): UserResponseDto => {
    const dto = new UserResponseDto()

    dto.id = user.id
    dto.email = user.email
    dto.fullName = user.name
    dto.cpfCnpj = user instanceof User ? user.cpf : user.cnpj
    dto.phone = user.phone
    dto.userType = user.type
    dto.birthDate = user instanceof User ? user.birthDate : null
    dto.gender = user instanceof User ? user.gender : null
    dto.addresses = plainToInstance(AddressDto, user.addresses, {
        excludeExtraneousValues: true
    })
    dto.termsAcceptance = terms

    if (user instanceof User)
        dto.originAcceptance = user.userOrigin ? true : false

    if (user instanceof Establishment) {
        dto.companyName = user.name
        dto.tradeName = user.name
        dto.logoUrl = user.logoUrl
    }

    return dto
}
