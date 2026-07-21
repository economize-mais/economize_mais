import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { EstablishmentTypes } from "@/modules/establishments/domain/entities/establishment-types.entity"

import { CreateEstablishmentTypeAdminDto } from "../dto/create-establishment-type-admin.dto"

@Injectable()
export class CreateEstablishmentTypeAdminUseCase {
    constructor(
        @InjectRepository(EstablishmentTypes)
        private readonly repo: Repository<EstablishmentTypes>
    ) {}

    async execute(dto: CreateEstablishmentTypeAdminDto) {
        const entity = this.repo.create({
            name: dto.name,
            description: dto.description,
            displayOrder: dto.displayOrder,
            isActive: dto.isActive ?? true,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        return this.repo.save(entity)
    }
}
