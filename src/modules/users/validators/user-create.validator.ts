import { BadRequestException } from "@nestjs/common"

import { CpfCnpjValidator } from "./cpf-cnpj.validator"
import { CreateUserDto } from "../dto/create-user.dto"

export class UserCreateValidator {

    public validate(data: CreateUserDto): boolean {
        if(!data)
            throw new BadRequestException("Dados do usuário são obrigatórios")

        switch(data.userType) {
            case "USER":
                return this.validateUserFields(data)
            case "COMPANY":
                return this.validateCompanyFields(data)
            default:
                throw new BadRequestException("Tipo de usuário inválido")
        }
    }

    private baseValidate(email: string, password: string) {
        if(!email || !password) 
            throw new BadRequestException("E-mail e senha são obrigatórios")
    }

    private validateUserFields(data: CreateUserDto): boolean {
        this.baseValidate(data.email, data.password)

        if(!data.fullName || !data.cpfCnpj) 
            throw new BadRequestException("Nome completo e CPF são obrigatórios para usuários")

        return CpfCnpjValidator.validate(data.cpfCnpj)
    }

    private validateCompanyFields(data: CreateUserDto): boolean {
        this.baseValidate(data.email, data.password)

        if(!data.companyName || !data.tradeName || !data.cpfCnpj)
            throw new BadRequestException("Nome da empresa, nome fantasia e CNPJ são obrigatórios para empresas")

        return CpfCnpjValidator.validate(data.cpfCnpj)
    }
}