import { plainToInstance } from "class-transformer"

import { UserResponseDto } from "@/modules/users/application/dto/user-response.dto"
import { User } from "@/modules/users/domain/entities/users.entity"

import { AddressDto } from "../dto/address.dto"

type Terms = {
    usage: boolean
    privacy: boolean
}

export const userToResponse = (user: User, terms: Terms): UserResponseDto => {
    const base = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        cpfCnpj: user.cpfCnpj,
        phone: user.phone,
        userType: user.userType,
        birthDate: user.birthDate,
        gender: user.gender,
        addresses: plainToInstance(AddressDto, user.addresses, {
            excludeExtraneousValues: true
        }),
        termsAcceptance: terms,
        originAcceptance: user.userOrigin ? true : false
    } as UserResponseDto

    if (user.userType === "USER") return base

    return {
        ...base,
        companyName: user.companyName,
        tradeName: user.tradeName,
        logoUrl: user.logoUrl
    } as UserResponseDto
}
