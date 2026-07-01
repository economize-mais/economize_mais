import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Establishment } from "@/modules/establishments/domain/entities/establishment.entity"

@Injectable()
export class UpdateStatusAdminUseCase {
    constructor(
        @InjectRepository(Establishment)
        private readonly repo: Repository<Establishment>
    ) {}

    async execute(id: string, isActive: boolean) {
        const establishment = await this.repo.findOne({ where: { id } })

        if (!establishment) {
            throw new NotFoundException(`Estabelecimento ${id} não encontrado`)
        }

        establishment.isActive = isActive
        await this.repo.save(establishment)

        return { id, isActive }
    }
}
