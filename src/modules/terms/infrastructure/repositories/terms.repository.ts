import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { BaseRepository } from "@/common/base/base.repository"
import { ITermsRepository } from "../../domain/interfaces/terms-repository.interface"
import { Terms } from "../../domain/entities/terms.entity"

@Injectable()
export class TermsRepository extends BaseRepository<Terms> implements ITermsRepository {

    constructor(
        @InjectRepository(Terms)
        private readonly repo: Repository<Terms>
    ) {
        super(repo)
    }

    async findByType(type: "USAGE" | "PRIVACY"): Promise<Terms> {
        return await this.repo.findOne({
            where: { type },
            order: {
                createdAt: "DESC"
            }
        })
    }

    async findLatestByType(type: "USAGE" | "PRIVACY", userId: string): Promise<boolean> {
        return await this.repo.findOne({ 
            where: { type },
            order: {
                createdAt: "DESC"
            }
        })
        .then(res => { return !!res?.acceptTerms.find(x => x.userId === userId) })
    }
}