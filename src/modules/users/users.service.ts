import { Injectable } from "@nestjs/common"

import { CreateUserDto } from "./dto/create-user.dto"
import { HashService } from "@/common/hash/hash.service"
import { UserCreateValidator } from "./validators/user-create.validator"
import { UserRepository } from "./repositories/users.repository"

@Injectable()
export class UserService {

    constructor(
        private readonly repo: UserRepository,
        private readonly hashProvider: HashService,
    ) {}

    async create(data: CreateUserDto) {
        new UserCreateValidator().validate(data)
    }
}