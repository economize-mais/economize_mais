import { Module } from "@nestjs/common"

import { AuthModule } from "@/auth/infrastructure/auth.module"
import { CommonModule } from "@/common/common.module"
import { UserModule } from "../users/users.module"

import { SigninUseCase } from "./application/use-cases/signin.use-case"
import { SigninController } from "./signin.controller"

@Module({
    imports: [AuthModule, CommonModule, UserModule],
    controllers: [SigninController],
    providers: [SigninUseCase]
})
export class SigninModule {}
