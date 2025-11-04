import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { BaseRepository } from "@/common/base/base.repository"

import { Establishment } from "../../domain/entities/establishment.entity"
import { IEstablishmentRepository } from "../../domain/interfaces/establishment-repository.interface"

@Injectable()
export class EstablishmentRepository
    extends BaseRepository<Establishment>
    implements IEstablishmentRepository
{
    constructor(
        @InjectRepository(Establishment)
        private readonly repo: Repository<Establishment>
    ) {
        super(repo)
    }

    async isEmailTaken(email: string): Promise<boolean> {
        const establishment = await this.repo.findOne({ where: { email } })
        return !!establishment
    }

    async isCnpjTaken(cnpj: string): Promise<boolean> {
        const establishment = await this.repo.findOne({ where: { cnpj } })
        return !!establishment
    }
}
