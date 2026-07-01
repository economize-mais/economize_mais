import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { Establishment } from "@/modules/establishments/domain/entities/establishment.entity"
import { S3UploadService } from "@/modules/uploads/infrastructure/services/s3-upload.service"

@Injectable()
export class UploadLogoAdminUseCase {
    constructor(
        @InjectRepository(Establishment)
        private readonly repo: Repository<Establishment>,
        private readonly s3: S3UploadService
    ) {}

    async execute(
        establishmentId: string,
        file: Express.Multer.File
    ): Promise<{ url: string }> {
        const establishment = await this.repo.findOne({
            where: { id: establishmentId }
        })

        if (!establishment) {
            throw new NotFoundException(
                `Estabelecimento ${establishmentId} não encontrado`
            )
        }

        const url = await this.s3.uploadFile(file, establishmentId, "logo")

        establishment.logoUrl = url
        await this.repo.save(establishment)

        return { url }
    }
}
