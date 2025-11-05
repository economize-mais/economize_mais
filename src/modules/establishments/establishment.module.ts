import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AuthModule } from "@/auth/infrastructure/auth.module"
import { CommonModule } from "@/common/common.module"

import { EstablishmentTypesController } from "./controllers/establishment-types.controller"
import { EstablishmentController } from "./controllers/establishment.controller"

import { CreateServiceUseCase } from "./application/use-cases/create-establishment.use-case"
import { EstablishmentTypesUseCase } from "./application/use-cases/establishiment-type/get-establishiment-types.use-case"

import { EstablishmentTypeLinks } from "./domain/entities/establishment-type-links.entity"
import { EstablishmentTypes } from "./domain/entities/establishment-types.entity"
import { Establishment } from "./domain/entities/establishment.entity"
import { ESTABLISHMENT_REPOSITORY } from "./domain/interfaces/establishment-repository.interface"
import { ESTABLISHMENT_TYPE_REPOSITORY } from "./domain/interfaces/establishment-type/establishment-type-repository.interface"

import { EstablishmentTypeRepository } from "./infrastructure/repositories/establishment-type/establishment-type.repository"
import { EstablishmentRepository } from "./infrastructure/repositories/establishment.repository"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Establishment,
            EstablishmentTypes,
            EstablishmentTypeLinks
        ]),
        AuthModule,
        CommonModule
    ],
    controllers: [EstablishmentController, EstablishmentTypesController],
    providers: [
        CreateServiceUseCase,
        EstablishmentTypesUseCase,
        {
            provide: ESTABLISHMENT_REPOSITORY,
            useClass: EstablishmentRepository
        },
        {
            provide: ESTABLISHMENT_TYPE_REPOSITORY,
            useClass: EstablishmentTypeRepository
        }
    ],
    exports: [ESTABLISHMENT_REPOSITORY]
})
export class EstablishmentModule {}
