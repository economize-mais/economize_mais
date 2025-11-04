import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException
} from "@nestjs/common"

import {
    AUTH_SERVICE,
    IAuthService
} from "@/auth/infrastructure/interfaces/auth-service.interface"
import {
    HASH_SERVICE,
    IHashService
} from "@/common/hash/interfaces/hash-service.interface"

import { establishmentToResponse } from "@/modules/establishments/application/presenter/establishment.presenter"
import { Establishment } from "@/modules/establishments/domain/entities/establishment.entity"
import {
    ESTABLISHMENT_REPOSITORY,
    IEstablishmentRepository
} from "@/modules/establishments/domain/interfaces/establishment-repository.interface"
import { userToResponse } from "@/modules/users/application/presenter/user.presenter"
import { User } from "@/modules/users/domain/entities/users.entity"
import {
    IUserRepository,
    USER_REPOSITORY
} from "@/modules/users/domain/interfaces/user-repository.interface"

import { SigninDto } from "../dto/signin.dto"

@Injectable()
export class SigninUseCase {
    constructor(
        @Inject(AUTH_SERVICE)
        private readonly authService: IAuthService,
        @Inject(HASH_SERVICE)
        private readonly hashProvider: IHashService,
        @Inject(ESTABLISHMENT_REPOSITORY)
        private readonly estabRepo: IEstablishmentRepository,
        @Inject(USER_REPOSITORY)
        private readonly repo: IUserRepository
    ) {}
    async execute({ email, password }: SigninDto) {
        const [establishment, user] = await Promise.all([
            this.estabRepo.findOne({ where: { email } }),
            this.repo.findOne({ where: { email } })
        ])

        if (!establishment && !user)
            throw new NotFoundException(`E-mail ${email} não encontrado`)

        const hashPasswordMatch = await this.comparePassword(
            password,
            establishment,
            user
        )

        if (!hashPasswordMatch)
            throw new BadRequestException("Senha está incorreta")

        const { usage, privacy } = this.checkTerms(establishment, user)

        const output = establishment
            ? establishmentToResponse(establishment, { usage, privacy })
            : userToResponse(user, { usage, privacy })

        output.accessToken = await this.authService.generateJwt({
            sub: establishment?.id ?? user?.id,
            email,
            type: establishment?.type ?? user?.type
        })

        return output
    }

    private async comparePassword(
        password: string,
        establishment?: Establishment,
        user?: User
    ): Promise<boolean> {
        if (establishment)
            return await this.hashProvider.compare(
                password,
                establishment.password
            )

        return await this.hashProvider.compare(password, user.password)
    }

    private checkTerms(
        establishment?: Establishment,
        user?: User
    ): {
        usage: boolean
        privacy: boolean
    } {
        let data: Establishment | User = null

        if (establishment) data = establishment
        else data = user

        const usage = data.terms.some((terms) => terms.terms.type === "USAGE")
        const privacy = data.terms.some(
            (terms) => terms.terms.type === "PRIVACY"
        )

        return { usage, privacy }
    }
}
