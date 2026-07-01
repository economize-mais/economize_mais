import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import {
    ApiBody,
    ApiConsumes,
    ApiResponse,
    ApiSecurity,
    ApiTags
} from "@nestjs/swagger"
import { UpdateEstablishmentAdminDto } from "../application/dto/update-establishment-admin.dto"
import { UpdateStatusDto } from "../application/dto/update-status.dto"
import { ListEstablishmentsAdminUseCase } from "../application/use-cases/list-establishments-admin.use-case"
import { UpdateEstablishmentAdminUseCase } from "../application/use-cases/update-establishment-admin.use-case"
import { UpdateStatusAdminUseCase } from "../application/use-cases/update-status-admin.use-case"
import { UploadLogoAdminUseCase } from "../application/use-cases/upload-logo-admin.use-case"

import { AdminGuard } from "../infrastructure/admin.guard"

@Controller("/api/admin")
@ApiTags("Admin — gestão de estabelecimentos")
@ApiSecurity("x-admin-key")
@UseGuards(AdminGuard)
export class AdminController {
    constructor(
        private readonly listUseCase: ListEstablishmentsAdminUseCase,
        private readonly updateUseCase: UpdateEstablishmentAdminUseCase,
        private readonly statusUseCase: UpdateStatusAdminUseCase,
        private readonly uploadLogoUseCase: UploadLogoAdminUseCase
    ) {}

    @ApiResponse({
        status: 201,
        description: "Faz upload da logo, salva no S3 com o ID real e atualiza o banco"
    })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: { file: { type: "string", format: "binary" } },
            required: ["file"]
        }
    })
    @Post("establishments/:id/logo")
    @UseInterceptors(FileInterceptor("file"))
    async uploadLogo(
        @Param("id") id: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.uploadLogoUseCase.execute(id, file)
    }

    @ApiResponse({
        status: 200,
        description: "Lista todos os estabelecimentos"
    })
    @Get("establishments")
    async findAll() {
        return this.listUseCase.execute()
    }

    @ApiResponse({
        status: 200,
        description: "Atualiza dados do estabelecimento"
    })
    @ApiResponse({ status: 404, description: "Não encontrado" })
    @Patch("establishments/:id")
    async update(
        @Param("id") id: string,
        @Body() dto: UpdateEstablishmentAdminDto
    ) {
        return this.updateUseCase.execute(id, dto)
    }

    @ApiResponse({
        status: 200,
        description: "Ativa ou desativa o estabelecimento"
    })
    @ApiResponse({ status: 404, description: "Não encontrado" })
    @HttpCode(HttpStatus.OK)
    @Patch("establishments/:id/status")
    async updateStatus(@Param("id") id: string, @Body() dto: UpdateStatusDto) {
        return this.statusUseCase.execute(id, dto.isActive)
    }
}
