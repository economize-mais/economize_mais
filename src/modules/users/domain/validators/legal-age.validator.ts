import { UnprocessableEntityException } from "@nestjs/common"
import { differenceInYears } from "date-fns"

export class LegalAgeValidator {
    static validate(birthDate: Date): void {
        const today = new Date()
        const age = differenceInYears(today, birthDate)

        if (age < 18)
            throw new UnprocessableEntityException(
                "Usuário deve ser maior de idade"
            )
    }
}
