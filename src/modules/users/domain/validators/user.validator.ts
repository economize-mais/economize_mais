import { UnprocessableEntityException } from "@nestjs/common"

import { CpfCnpjValidator } from "@/modules/shared/validator/cpf-cnpj.validator"
import { PasswordValidator } from "@/modules/shared/validator/password.validator"

import { CreateUserDto } from "../../application/dto/create-user.dto"
import { UpdateUserDto } from "../../application/dto/update-user.dto"
import { LegalAgeValidator } from "./legal-age.validator"
import { RequiredFieldsValidator } from "./required-fields.validator"

export class UserValidator {
    public validate(data: CreateUserDto | UpdateUserDto): void {
        if (data instanceof CreateUserDto)
            PasswordValidator.validate(data.password)

        LegalAgeValidator.validate(data.birthDate)

        switch (data.type) {
            case "USER":
                this.validateUserFields(data)
                break
            default:
                throw new UnprocessableEntityException(
                    "Tipo de usuário inválido"
                )
        }
    }

    private validateUserFields(data: CreateUserDto | UpdateUserDto): void {
        RequiredFieldsValidator.validate(data, ["name", "cpf"])

        if (!CpfCnpjValidator.validate(data.cpf))
            throw new UnprocessableEntityException("CPF inválido")
    }
}
