import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { EstablishmentTypes } from "@/modules/establishments/domain/entities/establishment-types.entity"

import { UpdateEstablishmentTypeAdminDto } from "../dto/update-establishment-type-admin.dto"

@Injectable()
export class UpdateEstablishmentTypeAdminUseCase {
    constructor(
        @InjectRepository(EstablishmentTypes)
        private readonly repo: Repository<EstablishmentTypes>
    ) {}

    async execute(id: string, dto: UpdateEstablishmentTypeAdminDto) {
        const type = await this.repo.findOne({ where: { id } })
        if (!type) throw new NotFoundException(`Tipo ${id} não encontrado`)

        if (dto.name !== undefined) type.name = dto.name
        if (dto.description !== undefined) type.description = dto.description
        if (dto.displayOrder !== undefined) type.displayOrder = dto.displayOrder
        type.updatedAt = new Date()

        return this.repo.save(type)
    }
}
