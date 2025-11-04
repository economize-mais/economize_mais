// import { UnprocessableEntityException } from "@nestjs/common"

// import { CreateUserDto } from "../../application/dto/create-user.dto"
// import { UpdateUserDto } from "../../application/dto/update-user.dto"

// import { CpfCnpjValidator } from "./cpf-cnpj.validator"
// import { LegalAgeValidator } from "./legal-age.validator"
// import { PasswordValidator } from "./password.validator"
// import { RequiredFieldsValidator } from "./required-fields.validator"

// export class UserValidator {
//     public validate(data: CreateUserDto | UpdateUserDto): void {
//         if (data instanceof CreateUserDto)
//             PasswordValidator.validate(data.password)

//         LegalAgeValidator.validate(data.birthDate)

//         switch (data.type) {
//             case "USER":
//                 this.validateUserFields(data)
//                 break
//             case "COMPANY":
//                 this.validateCompanyFields(data)
//                 break
//             default:
//                 throw new UnprocessableEntityException(
//                     "Tipo de usuário inválido"
//                 )
//         }
//     }

//     private validateUserFields(data: CreateUserDto | UpdateUserDto): void {
//         RequiredFieldsValidator.validate(data, ["fullName", "cpfCnpj"])

//         if (!CpfCnpjValidator.validate(data.cpfCnpj))
//             throw new UnprocessableEntityException("CPF inválido")
//     }

//     private validateCompanyFields(data: CreateUserDto | UpdateUserDto): void {
//         RequiredFieldsValidator.validate(data, [
//             "companyName",
//             "tradeName",
//             "cpfCnpj"
//         ])

//         if (!CpfCnpjValidator.validate(data.cpfCnpj))
//             throw new UnprocessableEntityException("CNPJ inválido")
//     }
// }
