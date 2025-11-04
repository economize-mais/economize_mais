import { UnprocessableEntityException } from "@nestjs/common"

export class PasswordValidator {
    static validate(password: string, up?: boolean): void {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/

        if (!regex.test(password))
            throw new UnprocessableEntityException(
                `A ${up ? "nova senha" : "senha"} deve ter no mínimo 8 caracteres, com pelo menos uma letra maiúscula, uma letra minúscula e um caractere especial`
            )
    }
}
