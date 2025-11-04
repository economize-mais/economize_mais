import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    UseGuards
} from "@nestjs/common"
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger"

import { AuthGuard } from "@/auth/infrastructure/auth.guard"
import { JwtPayload } from "@/auth/infrastructure/interfaces/jwt-payload.interface"
import { User } from "@/common/decorators/user.decorator"

import { AcceptTermDto } from "./application/dto/accept-term.dto"
import { TermsResponseDto } from "./application/dto/terms-response.dto"
import { AcceptTermUseCase } from "./application/use-cases/accept-term.use-case"
import { GetTermsByTypeUseCase } from "./application/use-cases/get-terms-by-type.use-case"

@Controller("/api/Terms")
@ApiTags("Routes to terms of use and privacy policy")
export class TermsController {
    constructor(
        private readonly accept: AcceptTermUseCase,
        private readonly getTerms: GetTermsByTypeUseCase
    ) {}

    @ApiBearerAuth()
    @ApiParam({ name: "type", enum: ["USAGE", "PRIVACY"] })
    @ApiResponse({ status: 200, type: TermsResponseDto })
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "Documento não encontrado" })
    @UseGuards(AuthGuard)
    @Get(":type")
    async termsByType(@Param("type") type: "USAGE" | "PRIVACY") {
        return await this.getTerms.execute(type)
    }

    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "Id não encontrado" })
    @UseGuards(AuthGuard)
    @Post("accept")
    async acceptTerm(@User() user: JwtPayload, @Body() term: AcceptTermDto) {
        return await this.accept.execute(user.sub, term.id)
    }
}
