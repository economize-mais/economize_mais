import { Injectable } from "@nestjs/common"

import { UploadResultVo } from "../../domain/value-objects/upload-result.vo"

import { S3UploadService } from "../../infrastructure/services/s3-upload.service"

import { UploadImageDto } from "../dtos/upload-image.dto"

@Injectable()
export class UploadImageUseCase {
    constructor(private readonly s3UploadService: S3UploadService) {}

    async execute(
        file: Express.Multer.File,
        establishmentId: string,
        dto: UploadImageDto
    ): Promise<UploadResultVo> {
        const imageUrl = await this.s3UploadService.uploadFile(
            file,
            establishmentId,
            dto.type
        )

        return new UploadResultVo({
            url: imageUrl,
            originalName: file.originalname,
            mimeType: file.mimetype,
            size: file.size
        })
    }
}
