import { User } from "@/modules/users/domain/entities/users.entity"
import { UserResponseDto } from "@/modules/users/application/dto/create-user-response.dto"

export const userToResponse = (user: User, token: string): UserResponseDto => {
    const base = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        userType: user.userType,
        birthDate: user.birthDate,
        token
    }

    if (user.userType === "USER")
        return base

    return {
        ...base,
        gender: user.gender,
        companyName: user.companyName,
        tradeName: user.tradeName,
        logoUrl: user.logoUrl
    }
}
