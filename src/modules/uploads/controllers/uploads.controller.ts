import {
    Body,
    Controller,
    Delete,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import {
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiResponse,
    ApiTags
} from "@nestjs/swagger"

import { AuthGuard } from "@/auth/infrastructure/auth.guard"
import { JwtPayload } from "@/auth/infrastructure/interfaces/jwt-payload.interface"

import { User } from "@/common/decorators/user.decorator"

import { UploadImageDto } from "../application/dtos/upload-image.dto"
import { UploadResponseDto } from "../application/dtos/upload-response.dto"
import { DeleteImageUseCase } from "../application/use-cases/delete-image.use-case"
import { UploadImageUseCase } from "../application/use-cases/upload-image.use-case"

@Controller("/api/uploads")
@ApiTags("Routes for saving and deleting images")
export class UploadsController {
    constructor(
        private readonly uploadImage: UploadImageUseCase,
        private readonly deleteImage: DeleteImageUseCase
    ) {}

    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor("file"))
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: { type: "string", format: "binary" },
                type: {
                    type: "string",
                    enum: ["product", "logo"],
                    description: "Tipo de upload (produto ou logo)"
                }
            },
            required: ["file", "type"]
        }
    })
    @ApiResponse({ status: 201, type: UploadResponseDto })
    @UseGuards(AuthGuard)
    @Post()
    async upload(
        @User() user: JwtPayload,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: UploadImageDto
    ): Promise<UploadResponseDto> {
        return await this.uploadImage.execute(file, user.sub, dto)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete()
    async remove(
        @Body("fileKey") fileKey: string
    ): Promise<{ message: string }> {
        await this.deleteImage.execute(fileKey)
        return { message: "Imagem removida com sucesso" }
    }
}
