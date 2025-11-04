import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"

import { UserResponseDto } from "../users/application/dto/user-response.dto"
import { SigninDto } from "./application/dto/signin.dto"
import { SigninUseCase } from "./application/use-cases/signin.use-case"

@Controller("/api/login")
@ApiTags("Route to gain access to other routes")
export class SigninController {
    constructor(private readonly signinUseCase: SigninUseCase) {}

    @ApiResponse({ status: 200, type: UserResponseDto })
    @ApiResponse({ status: 400, description: "Credenciais inválidas" })
    @ApiResponse({ status: 404, description: "E-mail não encontrado" })
    @HttpCode(HttpStatus.OK)
    @Post()
    async signin(@Body() signinDto: SigninDto) {
        return await this.signinUseCase.execute(signinDto)
    }
}
