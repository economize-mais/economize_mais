import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { EstablishmentTypes } from "@/modules/establishments/domain/entities/establishment-types.entity"

@Injectable()
export class UpdateEstablishmentTypeStatusAdminUseCase {
    constructor(
        @InjectRepository(EstablishmentTypes)
        private readonly repo: Repository<EstablishmentTypes>
    ) {}

    async execute(id: string, isActive: boolean) {
        const type = await this.repo.findOne({ where: { id } })
        if (!type) throw new NotFoundException(`Tipo ${id} não encontrado`)

        type.isActive = isActive
        type.updatedAt = new Date()
        await this.repo.save(type)

        return { id, isActive }
    }
}
