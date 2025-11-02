import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { BaseRepository } from "@/common/base/base.repository"

import { Origin } from "../../domain/entities/origin.entity"
import { IOriginRepository } from "../../domain/interfaces/origin-repository.interface"

@Injectable()
export class OriginRepository
    extends BaseRepository<Origin>
    implements IOriginRepository
{
    constructor(
        @InjectRepository(Origin)
        private readonly repo: Repository<Origin>
    ) {
        super(repo)
    }
}
