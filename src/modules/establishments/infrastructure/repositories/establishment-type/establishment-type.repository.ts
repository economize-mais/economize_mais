import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { BaseRepository } from "@/common/base/base.repository"

import { EstablishmentTypes } from "@/modules/establishments/domain/entities/establishment-types.entity"
import { IEstablishmentTypeRepository } from "@/modules/establishments/domain/interfaces/establishment-type/establishment-type-repository.interface"

@Injectable()
export class EstablishmentTypeRepository
    extends BaseRepository<EstablishmentTypes>
    implements IEstablishmentTypeRepository
{
    constructor(
        @InjectRepository(EstablishmentTypes)
        private readonly repo: Repository<EstablishmentTypes>
    ) {
        super(repo)
    }

    async getAllActiveTypesWithEstablishments() {
        return await this.repo.find({ order: { displayOrder: "ASC" } })
    }
}
