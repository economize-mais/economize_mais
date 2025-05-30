import { UnprocessableEntityException } from "@nestjs/common"

export class PasswordValidator {
    static validate(password: string) {
        if (!password || password.length < 8)
            throw new UnprocessableEntityException("Senha deve ter no mínimo 8 caracteres")
    }
}