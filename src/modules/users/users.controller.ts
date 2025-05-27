import { 
    Body, 
    Controller, 
    Post 
} from "@nestjs/common"
import { 
    ApiResponse, 
    ApiTags 
} from "@nestjs/swagger"

import { CreateUserDto } from "./dto/create-user.dto"
import { UserService } from "./users.service"

@Controller("/api/User")
@ApiTags("User routes")
export class UserController {

    constructor(
        private readonly service: UserService
    ) {}

    @Post()
    @ApiResponse({ status: 409, description: "conflito de e-mail"})
    @ApiResponse({ status: 422, description: "corpo da requisicao com dados inválidos"})
    async create(@Body() user: CreateUserDto) {
        return await this.service.create(user)
    }
}