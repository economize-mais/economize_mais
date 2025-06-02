import { UnprocessableEntityException } from "@nestjs/common"

import { CpfCnpjValidator } from "./cpf-cnpj.validator"
import { CreateUserDto } from "../../application/dto/create-user.dto"
import { PasswordValidator } from "./password.validator"
import { RequiredFieldsValidator } from "./required-fields.validator"
import { UpdateUserDto } from "../../application/dto/update-user.dto"

export class UserValidator {
    
    public validate(data: CreateUserDto | UpdateUserDto): void {
        if(!data)
            throw new UnprocessableEntityException("Dados do usuário são obrigatórios")

        if(data instanceof CreateUserDto)
            PasswordValidator.validate(data.password)

        switch(data.userType) {
            case "USER":
                this.validateUserFields(data)
                break
            case "COMPANY":
                this.validateCompanyFields(data)
                break
            default:
                throw new UnprocessableEntityException("Tipo de usuário inválido")
        }
    }

    private validateUserFields(data: CreateUserDto | UpdateUserDto): void {
        RequiredFieldsValidator.validate(data, ["fullName", "cpfCnpj"])

        if(!CpfCnpjValidator.validate(data.cpfCnpj))
            throw new UnprocessableEntityException("CPF inválido")
    }

    private validateCompanyFields(data: CreateUserDto | UpdateUserDto): void {
        RequiredFieldsValidator.validate(data, ["companyName", "tradeName", "cpfCnpj"])

        if(!CpfCnpjValidator.validate(data.cpfCnpj))
            throw new UnprocessableEntityException("CNPJ inválido")
    }
}