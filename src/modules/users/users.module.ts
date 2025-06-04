import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AuthModule } from "@/auth/infrastructure/auth.module"
import { CommonModule } from "@/common/common.module"
import { CreateServiceUseCase } from "./application/use-cases/create-user.use-case"
import { SigninUseCase } from "./application/use-cases/signin.use-case"
import { TermsModule } from "../terms/terms.module"
import { UpdatePasswordUseCase } from "./application/use-cases/update-password.use-case"
import { UpdateUserUseCase } from "./application/use-cases/update-user.use-case"
import { User } from "@/modules/users/domain/entities/users.entity"
import { UserController } from "./users.controller"
import { USER_REPOSITORY } from "./domain/interfaces/user-repository.interface"
import { UserRepository } from "./infrastructure/repositories/users.repository"

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        AuthModule,
        CommonModule,
        TermsModule
    ],
    controllers: [
        UserController
    ],
    providers: [
        CreateServiceUseCase,
        SigninUseCase,
        UpdatePasswordUseCase,
        UpdateUserUseCase,
        UserRepository,
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