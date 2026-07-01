import { ConflictException, Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import {
    HASH_SERVICE,
    IHashService
} from "@/common/hash/interfaces/hash-service.interface"

import { EstablishmentTypeLinks } from "../../domain/entities/establishment-type-links.entity"
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
        private readonly repo: IEstablishmentRepository,
        @InjectRepository(EstablishmentTypeLinks)
        private readonly typeLinksRepo: Repository<EstablishmentTypeLinks>
    ) {}

    async execute(data: CreateEstablishmentDto) {
        new EstablishmentsValidator().validate(data)

        if (await this.repo.isEmailTaken(data.email))
            throw new ConflictException(`Email ${data.email} já está em uso`)

        if (await this.repo.isCnpjTaken(data.cnpj))
            throw new ConflictException(`CNPJ ${data.cnpj} já está em uso`)

        const hashPassoword = await this.hashProvider.hash(data.password)

        const { typeIds, ...rest } = data
        const entity = { ...rest, password: hashPassoword }
        const establishment = await this.repo.save(entity)

        if (typeIds && typeIds.length > 0) {
            const links = typeIds.map((typeId) =>
                this.typeLinksRepo.create({
                    establishment_id: establishment.id,
                    type_id: typeId,
                    createdAt: new Date()
                })
            )
            await this.typeLinksRepo.save(links)
        }

        return establishmentToResponse(establishment, {
            usage: false,
            privacy: false
        })
    }
}
