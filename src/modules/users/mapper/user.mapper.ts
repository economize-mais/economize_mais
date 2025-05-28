import { User } from "@/database/models/users.entity"
import { UserResponseDto } from "../dto/user-response.dto"

export const toUserResponse = (user: User, token: string): UserResponseDto => {
    const {
        id, email, fullName, userType, birthDate, 
        gender, companyName, tradeName, logoUrl
    } = user

    if(userType === "USER")
        return {
            id,
            email,
            fullName,
            userType,
            birthDate,
            token
        }

    return {
        id,
        email,
        fullName,
        userType,
        birthDate,
        gender,
        companyName,
        tradeName,
        logoUrl,
        token
    }
}
