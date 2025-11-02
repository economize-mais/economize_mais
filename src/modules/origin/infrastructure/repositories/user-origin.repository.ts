import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { BaseRepository } from "@/common/base/base.repository"

import { UserOrigin } from "../../domain/entities/user-origin.entity"
import { IUserOriginRepository } from "../../domain/interfaces/user-origin-repository.interface"

@Injectable()
export class UserOriginRepository
    extends BaseRepository<UserOrigin>
    implements IUserOriginRepository
{
    constructor(
        @InjectRepository(UserOrigin)
        private readonly repo: Repository<UserOrigin>
    ) {
        super(repo)
    }
}
