import { 
    ApiBearerAuth,
    ApiResponse, 
    ApiTags 
} from "@nestjs/swagger"
import { 
    Controller, 
    Get, 
    Param, 
    UseGuards
} from "@nestjs/common"

import { AuthGuard } from "@/auth/infrastructure/auth.guard"
import { GetZipCodeUseCase } from "./application/use-cases/get-zip-code.use-cases"
import { ZipCodePresenter } from "./application/presenter/zip-code.presenter"

@Controller("/api/ZipCode")
@ApiTags("Route to get address data by zip code")
export class ZipCodeController {
    
    constructor(
        private readonly zipCode: GetZipCodeUseCase
    ) {}

    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: ZipCodePresenter })
    @ApiResponse({ status: 400, description: "O campo cep deve estar no formato xxxxx-xxx" })
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "CEP não encontrado" })
    @UseGuards(AuthGuard)
    @Get(":cep")
    async zipCodeData(
        @Param("cep") cep: string
    ) {
        return await this.zipCode.execute(cep)
    }
}