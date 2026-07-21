import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { EstablishmentTypes } from "@/modules/establishments/domain/entities/establishment-types.entity"

@Injectable()
export class ListEstablishmentTypesAdminUseCase {
    constructor(
        @InjectRepository(EstablishmentTypes)
        private readonly repo: Repository<EstablishmentTypes>
    ) {}

    async execute() {
        return this.repo.find({ order: { displayOrder: "ASC" } })
    }
}
