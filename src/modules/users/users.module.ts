import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { CommonModule } from "@/common/common.module"
import { CreateServiceUseCase } from "./application/use-cases/create-user.use-case"
import { User } from "@/modules/users/domain/entities/users.entity"
import { UserController } from "./users.controller"
import { USER_REPOSITORY } from "./domain/interfaces/user-repository.interface"
import { UserRepository } from "./infrastructure/repositories/users.repository"

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        CommonModule
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserRepository,
        CreateServiceUseCase,
        {
            provide: USER_REPOSITORY,
            useClass: UserRepository
        }
    ],
    exports: [
        USER_REPOSITORY
    ]
})

export class UserModule {}