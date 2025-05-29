import { 
    Body, 
    Controller, 
    Post 
} from "@nestjs/common"
import { 
    ApiResponse, 
    ApiTags 
} from "@nestjs/swagger"

import { CreateServiceUseCase } from "./application/use-cases/create-user.use-case"
import { CreateUserDto } from "./application/dto/create-user.dto"
import { UserResponseDto } from "./application/dto/create-user-response.dto"

@Controller("/api/User")
@ApiTags("User routes")
export class UserController {

    constructor(
        private readonly create: CreateServiceUseCase
    ) {}

    @Post()
    @ApiResponse({ status: 201, type: UserResponseDto })
    @ApiResponse({ status: 409, description: "conflito de e-mail"})
    @ApiResponse({ status: 422, description: "corpo da requisicao com dados inválidos"})
    async createUser(@Body() user: CreateUserDto) {
        return await this.create.execute(user)
    }
}