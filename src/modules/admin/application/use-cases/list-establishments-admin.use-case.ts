import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Establishment } from "@/modules/establishments/domain/entities/establishment.entity"

@Injectable()
export class ListEstablishmentsAdminUseCase {
    constructor(
        @InjectRepository(Establishment)
        private readonly repo: Repository<Establishment>
    ) {}

    async execute() {
        return this.repo.find({
            relations: ["addresses", "typeLinks", "typeLinks.type"],
            order: { createdAt: "DESC" }
        })
    }
}
