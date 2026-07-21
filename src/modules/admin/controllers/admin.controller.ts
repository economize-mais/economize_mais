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
import { CreateEstablishmentTypeAdminDto } from "../application/dto/create-establishment-type-admin.dto"
import { UpdateEstablishmentTypeAdminDto } from "../application/dto/update-establishment-type-admin.dto"
import { CreateEstablishmentTypeAdminUseCase } from "../application/use-cases/create-establishment-type-admin.use-case"
import { ListEstablishmentTypesAdminUseCase } from "../application/use-cases/list-establishment-types-admin.use-case"
import { UpdateEstablishmentTypeAdminUseCase } from "../application/use-cases/update-establishment-type-admin.use-case"
import { UpdateEstablishmentTypeStatusAdminUseCase } from "../application/use-cases/update-establishment-type-status-admin.use-case"
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
        private readonly uploadLogoUseCase: UploadLogoAdminUseCase,
        private readonly listTypesUseCase: ListEstablishmentTypesAdminUseCase,
        private readonly createTypeUseCase: CreateEstablishmentTypeAdminUseCase,
        private readonly updateTypeUseCase: UpdateEstablishmentTypeAdminUseCase,
        private readonly updateTypeStatusUseCase: UpdateEstablishmentTypeStatusAdminUseCase
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

    // ── Tipos de estabelecimento ──────────────────────────────────────

    @ApiResponse({ status: 200, description: "Lista todos os tipos de estabelecimento" })
    @Get("establishment-types")
    async listTypes() {
        return this.listTypesUseCase.execute()
    }

    @ApiResponse({ status: 201, description: "Cria um novo tipo de estabelecimento" })
    @Post("establishment-types")
    async createType(@Body() dto: CreateEstablishmentTypeAdminDto) {
        return this.createTypeUseCase.execute(dto)
    }

    @ApiResponse({ status: 200, description: "Atualiza um tipo de estabelecimento" })
    @ApiResponse({ status: 404, description: "Não encontrado" })
    @Patch("establishment-types/:id")
    async updateType(
        @Param("id") id: string,
        @Body() dto: UpdateEstablishmentTypeAdminDto
    ) {
        return this.updateTypeUseCase.execute(id, dto)
    }

    @ApiResponse({ status: 200, description: "Ativa ou inativa um tipo de estabelecimento" })
    @ApiResponse({ status: 404, description: "Não encontrado" })
    @HttpCode(HttpStatus.OK)
    @Patch("establishment-types/:id/status")
    async updateTypeStatus(
        @Param("id") id: string,
        @Body() dto: UpdateStatusDto
    ) {
        return this.updateTypeStatusUseCase.execute(id, dto.isActive)
    }
}
