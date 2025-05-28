import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { CommonModule } from "@/common/common.module"
import { IUserRepository } from "./repositories/interfaces/user-repository.interface"
import { User } from "@/database/models/users.entity"
import { UserController } from "./users.controller"
import { UserRepository } from "./repositories/users.repository"
import { UserService } from "./users.service"

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
        UserService,
        {
            provide: IUserRepository,
            useClass: UserRepository
        }
    ],
    exports: [
        IUserRepository
    ]
})

export class UserModule {}