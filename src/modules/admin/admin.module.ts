import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { EstablishmentTypeLinks } from "@/modules/establishments/domain/entities/establishment-type-links.entity"
import { EstablishmentTypes } from "@/modules/establishments/domain/entities/establishment-types.entity"
import { Establishment } from "@/modules/establishments/domain/entities/establishment.entity"
import { UploadsModule } from "@/modules/uploads/uploads.module"

import { CreateEstablishmentTypeAdminUseCase } from "./application/use-cases/create-establishment-type-admin.use-case"
import { ListEstablishmentTypesAdminUseCase } from "./application/use-cases/list-establishment-types-admin.use-case"
import { ListEstablishmentsAdminUseCase } from "./application/use-cases/list-establishments-admin.use-case"
import { UpdateEstablishmentAdminUseCase } from "./application/use-cases/update-establishment-admin.use-case"
import { UpdateEstablishmentTypeAdminUseCase } from "./application/use-cases/update-establishment-type-admin.use-case"
import { UpdateEstablishmentTypeStatusAdminUseCase } from "./application/use-cases/update-establishment-type-status-admin.use-case"
import { UpdateStatusAdminUseCase } from "./application/use-cases/update-status-admin.use-case"
import { UploadLogoAdminUseCase } from "./application/use-cases/upload-logo-admin.use-case"

import { AdminController } from "./controllers/admin.controller"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Establishment,
            EstablishmentTypeLinks,
            EstablishmentTypes
        ]),
        UploadsModule
    ],
    controllers: [AdminController],
    providers: [
        ListEstablishmentsAdminUseCase,
        UpdateEstablishmentAdminUseCase,
        UpdateStatusAdminUseCase,
        UploadLogoAdminUseCase,
        ListEstablishmentTypesAdminUseCase,
        CreateEstablishmentTypeAdminUseCase,
        UpdateEstablishmentTypeAdminUseCase,
        UpdateEstablishmentTypeStatusAdminUseCase
    ]
})
export class AdminModule {}
