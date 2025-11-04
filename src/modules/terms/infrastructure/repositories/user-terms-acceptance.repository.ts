import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { BaseRepository } from "@/common/base/base.repository"

import { UserTermsAcceptance } from "../../domain/entities/user-terms-acceptance.entity"
import { IUserTermsAcceptanceRepository } from "../../domain/interfaces/user-terms-acceptance-repository.interface"

@Injectable()
export class UserTermsAcceptanceRepository
    extends BaseRepository<UserTermsAcceptance>
    implements IUserTermsAcceptanceRepository
{
    constructor(
        @InjectRepository(UserTermsAcceptance)
        private readonly repo: Repository<UserTermsAcceptance>
    ) {
        super(repo)
    }
}
