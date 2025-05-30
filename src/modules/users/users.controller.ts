import { 
    Body, 
    Controller, 
    HttpCode, 
    HttpStatus, 
    Param, 
    Patch, 
    Post, 
    UseGuards
} from "@nestjs/common"
import { 
    ApiBearerAuth,
    ApiResponse, 
    ApiTags 
} from "@nestjs/swagger"

import { AuthGuard } from "@/auth/infrastructure/auth.guard"
import { AuthService } from "@/auth/infrastructure/auth.service"
import { CreateServiceUseCase } from "./application/use-cases/create-user.use-case"
import { CreateUserDto } from "./application/dto/create-user.dto"
import { SigninDto } from "./application/dto/signin.dto"
import { SigninUseCase } from "./application/use-cases/signin.use-case"
import { UpdatePasswordDto } from "./application/dto/update-password.dto"
import { UpdatePasswordUseCase } from "./application/use-cases/update-password.use-case"
import { UserResponseDto } from "./application/dto/create-user-response.dto"

@Controller("/api/User")
@ApiTags("User routes")
export class UserController {

    constructor(
        private readonly authService: AuthService,
        private readonly create: CreateServiceUseCase,
        private readonly signinUseCase: SigninUseCase,
        private readonly updatePass: UpdatePasswordUseCase
    ) {}

    @ApiResponse({ status: 201, type: UserResponseDto })
    @ApiResponse({ status: 409, description: "conflito de e-mail"})
    @ApiResponse({ status: 422, description: "corpo da requisicao com dados inválidos"})
    @Post()
    async createUser(
        @Body() user: CreateUserDto
    ) {
        return await this.create.execute(user)
    }

    @ApiResponse({ status: 200, type: UserResponseDto })
    @ApiResponse({ status: 400, description: "Credenciais inválidas" })
    @ApiResponse({ status: 404, description: "E-mail não encontrado" })
    @HttpCode(200)
    @Post("login")
    async login(@Body() signinDto: SigninDto) {
        const output = await this.signinUseCase.execute(signinDto)
        output.accessToken = await this.authService.generateJwt(output.id)
        return output
    }

    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "Id não encontrado" })
    @ApiResponse({ status: 422, description: "Corpo da requisição com dados inválidos" })
    @UseGuards(AuthGuard)
    @Patch(":id")
    async updatePassword(
        @Param("id") id: string,
        @Body() updatePasswordDto: UpdatePasswordDto
    ) {
        return await this.updatePass.execute(id, updatePasswordDto)
    }
}