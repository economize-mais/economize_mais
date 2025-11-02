import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AuthModule } from "@/auth/infrastructure/auth.module"

import { OriginController } from "./origin.controller"

import { GetOriginUseCase } from "./application/use-cases/get-origin.use-case"
import { AcceptOriginUseCase } from "./application/use-cases/user-origin.use-case"

import { Origin } from "./domain/entities/origin.entity"
import { UserOrigin } from "./domain/entities/user-origin.entity"
import { ORIGIN_REPOSITORY } from "./domain/interfaces/origin-repository.interface"
import { USER_ORIGIN_REPOSITORY } from "./domain/interfaces/user-origin-repository.interface"

import { OriginRepository } from "./infrastructure/repositories/origin.repository"
import { UserOriginRepository } from "./infrastructure/repositories/user-origin.repository"

@Module({
    imports: [TypeOrmModule.forFeature([Origin, UserOrigin]), AuthModule],
    controllers: [OriginController],
    providers: [
        AcceptOriginUseCase,
        GetOriginUseCase,
        {
            provide: ORIGIN_REPOSITORY,
            useClass: OriginRepository
        },
        {
            provide: USER_ORIGIN_REPOSITORY,
            useClass: UserOriginRepository
        }
    ]
})
export class OriginModule {}
