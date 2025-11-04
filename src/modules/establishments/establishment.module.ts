import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AuthModule } from "@/auth/infrastructure/auth.module"
import { CommonModule } from "@/common/common.module"

import { EstablishmentController } from "./establishment.controller"

import { CreateServiceUseCase } from "./application/use-cases/create-establishment.use-case"

import { Establishment } from "./domain/entities/establishment.entity"
import { ESTABLISHMENT_REPOSITORY } from "./domain/interfaces/establishment-repository.interface"

import { EstablishmentRepository } from "./infrastructure/repositories/establishment.repository"

@Module({
    imports: [
        TypeOrmModule.forFeature([Establishment]),
        AuthModule,
        CommonModule
    ],
    controllers: [EstablishmentController],
    providers: [
        CreateServiceUseCase,
        // UpdatePasswordUseCase,
        // UpdateUserUseCase,
        {
            provide: ESTABLISHMENT_REPOSITORY,
            useClass: EstablishmentRepository
        }
    ],
    exports: [ESTABLISHMENT_REPOSITORY]
})
export class EstablishmentModule {}
