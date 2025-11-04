import { UnprocessableEntityException } from "@nestjs/common"

import { CpfCnpjValidator } from "@/modules/shared/validator/cpf-cnpj.validator"
import { PasswordValidator } from "@/modules/shared/validator/password.validator"
import { RequiredFieldsValidator } from "@/modules/users/domain/validators/required-fields.validator"

import { CreateEstablishmentDto } from "../../application/dto/create-establishment.dto"

export class EstablishmentsValidator {
    public validate(data: CreateEstablishmentDto /* | UpdateUserDto*/): void {
        if (data instanceof CreateEstablishmentDto)
            PasswordValidator.validate(data.password)

        switch (data.type) {
            case "COMPANY":
                this.validateCompanyFields(data)
                break
            default:
                throw new UnprocessableEntityException(
                    "Tipo de usuário inválido"
                )
        }
    }

    private validateCompanyFields(
        data: CreateEstablishmentDto /* | UpdateUserDto*/
    ): void {
        RequiredFieldsValidator.validate(data, [
            "companyName",
            "tradeName",
            "cnpj"
        ])

        if (!CpfCnpjValidator.validate(data.cnpj))
            throw new UnprocessableEntityException("CNPJ inválido")
    }
}
