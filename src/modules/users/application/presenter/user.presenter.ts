import { plainToInstance } from "class-transformer"

import { AddressDto } from "@/modules/shared/dto/address.dto"

import { User } from "../../domain/entities/users.entity"
import { UserResponseDto } from "../dto/user-response.dto"

type Terms = {
    usage: boolean
    privacy: boolean
}

export const userToResponse = (user: User, terms: Terms): UserResponseDto => {
    const dto = new UserResponseDto()

    dto.id = user.id
    dto.email = user.email
    dto.name = user.name
    dto.cpf = user.cpf
    dto.phone = user.phone
    dto.type = user.type
    dto.birthDate = user instanceof User ? user.birthDate : null
    dto.gender = user instanceof User ? user.gender : null
    dto.addresses = plainToInstance(AddressDto, user.addresses, {
        excludeExtraneousValues: true
    })
    dto.termsAcceptance = terms

    if (user instanceof User)
        dto.originAcceptance = user.userOrigin ? true : false

    return dto
}
