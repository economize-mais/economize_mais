import { plainToInstance } from "class-transformer"

import { AddressDto } from "../dto/address.dto"
import { User } from "@/modules/users/domain/entities/users.entity"
import { UserResponseDto } from "@/modules/users/application/dto/user-response.dto"

export const userToResponse = (user: User): UserResponseDto => {
    const base = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
        birthDate: user.birthDate,
        addresses: plainToInstance(AddressDto, user.addresses, { excludeExtraneousValues: true })
    } as UserResponseDto

    if (user.userType === "USER")
        return base

    return {
        ...base,
        gender: user.gender,
        companyName: user.companyName,
        tradeName: user.tradeName,
        logoUrl: user.logoUrl
    } as UserResponseDto
}
