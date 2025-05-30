import { UnprocessableEntityException } from "@nestjs/common"

import { CreateUserDto } from "../../application/dto/create-user.dto"

export class RequiredFieldsValidator {
    static validate(data: CreateUserDto, fields: string[]): void {
        for (const field of fields)
            if (!data[field])
                throw new UnprocessableEntityException(`${field} é obrigatório`)
    }
}
