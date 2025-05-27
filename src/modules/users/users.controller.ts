import { Controller, Post } from "@nestjs/common"
import { UserService } from "./users.service"
import { ApiTags } from "@nestjs/swagger"
import { CreateUserDto, Gender, UserType } from "./dto/create-user.dto"

@Controller("/api/v1/user")
@ApiTags("User routes")
export class UserController {

    private user: CreateUserDto = {
        email: "marcusmigueell@gmail.com",
        password: "1234",
        fullName: "Marcus Miguel",
        cpfCnpj: "09726257638",
        birthDate: "1990-05-07",
        gender: Gender.M,
        userType: UserType.USER
    }

    constructor(
        private readonly service: UserService
    ) {}

    @Post("/create")
    async create() {
        return await this.service.create(this.user)
    }
}