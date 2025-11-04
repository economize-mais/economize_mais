import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    Put,
    UseGuards
} from "@nestjs/common"
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger"

import { AuthGuard } from "@/auth/infrastructure/auth.guard"
import { JwtPayload } from "@/auth/infrastructure/interfaces/jwt-payload.interface"
import { User } from "@/common/decorators/user.decorator"

import { CreateUserDto } from "./application/dto/create-user.dto"
import { UpdatePasswordDto } from "./application/dto/update-password.dto"
import { UpdateUserDto } from "./application/dto/update-user.dto"
import { UserResponseDto } from "./application/dto/user-response.dto"
import { CreateServiceUseCase } from "./application/use-cases/create-user.use-case"
import { UpdatePasswordUseCase } from "./application/use-cases/update-password.use-case"
import { UpdateUserUseCase } from "./application/use-cases/update-user.use-case"

@Controller("/api/User")
@ApiTags("User routes")
export class UserController {
    constructor(
        private readonly create: CreateServiceUseCase,
        private readonly updatePass: UpdatePasswordUseCase,
        private readonly updateUser: UpdateUserUseCase
    ) {}

    @ApiResponse({ status: 201, type: UserResponseDto })
    @ApiResponse({ status: 409, description: "conflito de e-mail" })
    @ApiResponse({
        status: 422,
        description: "corpo da requisicao com dados inválidos"
    })
    @Post()
    async createUser(@Body() user: CreateUserDto) {
        return await this.create.execute(user)
    }

    @ApiBearerAuth()
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "Id não encontrado" })
    @ApiResponse({
        status: 422,
        description: "Corpo da requisição com dados inválidos"
    })
    @UseGuards(AuthGuard)
    @Patch("update-password")
    async updatePassword(
        @User() user: JwtPayload,
        @Body() updatePasswordDto: UpdatePasswordDto
    ) {
        return await this.updatePass.execute(user.sub, updatePasswordDto)
    }

    @ApiBearerAuth()
    @ApiResponse({ status: 200, type: UserResponseDto })
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "Id não encontrado" })
    @ApiResponse({
        status: 422,
        description: "corpo da requisicao com dados inválidos"
    })
    @UseGuards(AuthGuard)
    @Put()
    async update(
        @User() user: JwtPayload,
        @Body() updateUserdto: UpdateUserDto
    ) {
        return await this.updateUser.execute(user.sub, updateUserdto)
    }
}
