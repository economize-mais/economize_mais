import { Controller, Get } from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"

import { EstablishmentTypeResponse } from "../application/dto/establishiment-type/get-establishment-types.response"
import { EstablishmentTypesUseCase } from "../application/use-cases/establishiment-type/get-establishiment-types.use-case"

@Controller("/api/establishment/types")
@ApiTags("Return all active types with their linked active establishments")
export class EstablishmentTypesController {
    constructor(
        private readonly getEstablishmentTypes: EstablishmentTypesUseCase
    ) {}

    @ApiResponse({
        status: 200,
        type: EstablishmentTypeResponse,
        isArray: true
    })
    @Get()
    async getAllActiveTypes() {
        return await this.getEstablishmentTypes.execute()
    }
}
