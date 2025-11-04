import { ConflictException, Inject, Injectable } from "@nestjs/common"

import {
    HASH_SERVICE,
    IHashService
} from "@/common/hash/interfaces/hash-service.interface"

import {
    ESTABLISHMENT_REPOSITORY,
    IEstablishmentRepository
} from "../../domain/interfaces/establishment-repository.interface"
import { EstablishmentsValidator } from "../../domain/validator/establishment.validator"

import { CreateEstablishmentDto } from "../dto/create-establishment.dto"
import { establishmentToResponse } from "../presenter/establishment.presenter"

@Injectable()
export class CreateServiceUseCase {
    constructor(
        @Inject(HASH_SERVICE)
        private readonly hashProvider: IHashService,
        @Inject(ESTABLISHMENT_REPOSITORY)
        private readonly repo: IEstablishmentRepository
    ) {}

    async execute(data: CreateEstablishmentDto) {
        new EstablishmentsValidator().validate(data)

        if (await this.repo.isEmailTaken(data.email))
            throw new ConflictException(`Email ${data.email} já está em uso`)

        if (await this.repo.isCnpjTaken(data.cnpj))
            throw new ConflictException(`CNPJ ${data.cnpj} já está em uso`)

        const hashPassoword = await this.hashProvider.hash(data.password)

        const entity = {
            ...data,
            password: hashPassoword
        }
        const establishments = await this.repo.save(entity)

        return establishmentToResponse(establishments, {
            usage: false,
            privacy: false
        })
    }
}
