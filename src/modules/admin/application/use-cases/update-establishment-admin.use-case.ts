import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { EstablishmentTypeLinks } from "@/modules/establishments/domain/entities/establishment-type-links.entity"
import { Establishment } from "@/modules/establishments/domain/entities/establishment.entity"

import { UpdateEstablishmentAdminDto } from "../dto/update-establishment-admin.dto"

@Injectable()
export class UpdateEstablishmentAdminUseCase {
    constructor(
        @InjectRepository(Establishment)
        private readonly repo: Repository<Establishment>,
        @InjectRepository(EstablishmentTypeLinks)
        private readonly typeLinksRepo: Repository<EstablishmentTypeLinks>
    ) {}

    async execute(id: string, dto: UpdateEstablishmentAdminDto) {
        const establishment = await this.repo.findOne({ where: { id } })

        if (!establishment) {
            throw new NotFoundException(`Estabelecimento ${id} não encontrado`)
        }

        if (dto.companyName !== undefined)
            establishment.companyName = dto.companyName
        if (dto.tradeName !== undefined) establishment.tradeName = dto.tradeName
        if (dto.phone !== undefined) establishment.phone = dto.phone
        if (dto.logoUrl !== undefined) establishment.logoUrl = dto.logoUrl

        await this.repo.save(establishment)

        if (dto.typeId !== undefined) {
            await this.typeLinksRepo.delete({ establishment_id: id })

            if (dto.typeId) {
                await this.typeLinksRepo.save(
                    this.typeLinksRepo.create({
                        establishment_id: id,
                        type_id: dto.typeId,
                        createdAt: new Date()
                    })
                )
            }
        }

        return this.repo.findOne({
            where: { id },
            relations: ["addresses", "typeLinks", "typeLinks.type"]
        })
    }
}
