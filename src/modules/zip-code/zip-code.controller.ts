import { Controller, Get, Param } from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"

import { ZipCodePresenter } from "./application/presenter/zip-code.presenter"
import { GetZipCodeUseCase } from "./application/use-cases/get-zip-code.use-cases"

@Controller("/api/zipCode")
@ApiTags("Route to get address data by zip code")
export class ZipCodeController {
    constructor(private readonly zipCode: GetZipCodeUseCase) {}

    @ApiResponse({ status: 200, type: ZipCodePresenter })
    @ApiResponse({
        status: 400,
        description: "O campo cep deve estar no formato xxxxx-xxx"
    })
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "CEP não encontrado" })
    @Get(":cep")
    async zipCodeData(@Param("cep") cep: string) {
        return await this.zipCode.execute(cep)
    }
}
