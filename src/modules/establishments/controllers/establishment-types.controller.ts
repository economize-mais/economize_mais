import { Controller, Get, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger"

import { AuthGuard } from "@/auth/infrastructure/auth.guard"

import { EstablishmentTypeResponse } from "../application/dto/establishiment-type/get-establishment-types.response"
import { EstablishmentTypesUseCase } from "../application/use-cases/establishiment-type/get-establishiment-types.use-case"

@Controller("/api/establishment/types")
@ApiTags("Return all active types with their linked active establishments")
export class EstablishmentTypesController {
    constructor(
        private readonly getEstablishmentTypes: EstablishmentTypesUseCase
    ) {}

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        type: EstablishmentTypeResponse,
        isArray: true
    })
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @UseGuards(AuthGuard)
    @Get()
    async getAllActiveTypes() {
        return await this.getEstablishmentTypes.execute()
    }
}
