import { 
    Body, 
    Controller, 
    HttpCode, 
    HttpStatus, 
    Param, 
    Patch, 
    Post 
} from "@nestjs/common"
import { 
    ApiResponse, 
    ApiTags 
} from "@nestjs/swagger"

import { CreateServiceUseCase } from "./application/use-cases/create-user.use-case"
import { CreateUserDto } from "./application/dto/create-user.dto"
import { UpdatePasswordDto } from "./application/dto/update-password.dto"
import { UpdatePasswordUseCase } from "./application/use-cases/update-password.use-case"
import { UserResponseDto } from "./application/dto/create-user-response.dto"

@Controller("/api/User")
@ApiTags("User routes")
export class UserController {

    constructor(
        private readonly create: CreateServiceUseCase,
        private readonly updatePass: UpdatePasswordUseCase
    ) {}

    @Post()
    @ApiResponse({ status: 201, type: UserResponseDto })
    @ApiResponse({ status: 409, description: "conflito de e-mail"})
    @ApiResponse({ status: 422, description: "corpo da requisicao com dados inválidos"})
    async createUser(
        @Body() user: CreateUserDto
    ) {
        return await this.create.execute(user)
    }

    @Patch(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "Id não encontrado" })
    @ApiResponse({ status: 422, description: "Corpo da requisição com dados inválidos" })
    async updatePassword(
        @Param("id") id: string,
        @Body() updatePasswordDto: UpdatePasswordDto
    ) {
        return await this.updatePass.execute(id, updatePasswordDto)
    }
}