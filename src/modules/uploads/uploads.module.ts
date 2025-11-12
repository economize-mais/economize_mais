import { Module } from "@nestjs/common"

import { AuthModule } from "@/auth/infrastructure/auth.module"

import { DeleteImageUseCase } from "./application/use-cases/delete-image.use-case"
import { UploadImageUseCase } from "./application/use-cases/upload-image.use-case"

import { UploadsController } from "./controllers/uploads.controller"

import { S3UploadService } from "./infrastructure/services/s3-upload.service"

@Module({
    imports: [AuthModule],
    controllers: [UploadsController],
    providers: [S3UploadService, UploadImageUseCase, DeleteImageUseCase],
    exports: [S3UploadService]
})
export class UploadsModule {}
