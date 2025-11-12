import { Injectable } from "@nestjs/common"

import { S3UploadService } from "../../infrastructure/services/s3-upload.service"

@Injectable()
export class DeleteImageUseCase {
    constructor(private readonly s3UploadService: S3UploadService) {}

    async execute(fileKey: string): Promise<void> {
        await this.s3UploadService.deleteFile(fileKey)
    }
}
