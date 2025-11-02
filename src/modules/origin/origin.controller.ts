import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards
} from "@nestjs/common"
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger"

import { AuthGuard } from "@/auth/infrastructure/auth.guard"
import { JwtPayload } from "@/auth/infrastructure/interfaces/jwt-payload.interface"
import { User } from "@/common/decorators/user.decorator"

import { OriginResponseDto } from "./application/dto/origin-response.dto"
import { UserOriginDto } from "./application/dto/user-origin.dto"
import { GetOriginUseCase } from "./application/use-cases/get-origin.use-case"
import { AcceptOriginUseCase } from "./application/use-cases/user-origin.use-case"

@Controller("/api/Origin")
@ApiTags("Routes to manage user origin information")
export class OriginController {
    constructor(
        private readonly accept: AcceptOriginUseCase,
        private readonly getOrigins: GetOriginUseCase
    ) {}

    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: OriginResponseDto, isArray: true })
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @UseGuards(AuthGuard)
    @Get()
    async origins() {
        return await this.getOrigins.execute()
    }

    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "Id não encontrado" })
    @UseGuards(AuthGuard)
    @Post()
    async userOrigin(@User() user: JwtPayload, @Body() term: UserOriginDto) {
        return await this.accept.execute(user.sub, term.id)
    }
}
