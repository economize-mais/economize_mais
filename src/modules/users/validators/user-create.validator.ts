import { UnprocessableEntityException } from "@nestjs/common"

import { CpfCnpjValidator } from "./cpf-cnpj.validator"
import { CreateUserDto } from "../dto/create-user.dto"

export class UserCreateValidator {

    public validate(data: CreateUserDto): boolean {
        if(!data)
            throw new UnprocessableEntityException("Dados do usuário são obrigatórios")

        switch(data.userType) {
            case "USER":
                return this.validateUserFields(data)
            case "COMPANY":
                return this.validateCompanyFields(data)
            default:
                throw new UnprocessableEntityException("Tipo de usuário inválido")
        }
    }

    private baseValidate(password: string) {
        if(password.length < 8) 
            throw new UnprocessableEntityException("senha deve ter no mínimo 8 caracteres")
    }

    private validateUserFields(data: CreateUserDto): boolean {
        this.baseValidate(data.password)

        if(!data.fullName || !data.cpfCnpj) 
            throw new UnprocessableEntityException("Nome completo e CPF são obrigatórios para usuários")

        return CpfCnpjValidator.validate(data.cpfCnpj)
    }

    private validateCompanyFields(data: CreateUserDto): boolean {
        this.baseValidate(data.password)

        if(!data.companyName || !data.tradeName || !data.cpfCnpj)
            throw new UnprocessableEntityException("Nome da empresa, nome fantasia e CNPJ são obrigatórios para empresas")

        return CpfCnpjValidator.validate(data.cpfCnpj)
    }
}