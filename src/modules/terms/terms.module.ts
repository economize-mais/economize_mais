import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AuthModule } from "@/auth/infrastructure/auth.module"

import { TermsController } from "./terms.controller"

import { AcceptTermUseCase } from "./application/use-cases/accept-term.use-case"
import { GetTermsByTypeUseCase } from "./application/use-cases/get-terms-by-type.use-case"

import { Terms } from "./domain/entities/terms.entity"
import { UserTermsAcceptance } from "./domain/entities/user-terms-acceptance.entity"
import { TERMS_REPOSITORY } from "./domain/interfaces/terms-repository.interface"
import { USER_TERMS_ACCEPTANCE_REPOSITORY } from "./domain/interfaces/user-terms-acceptance-repository.interface"

import { TermsRepository } from "./infrastructure/repositories/terms.repository"
import { UserTermsAcceptanceRepository } from "./infrastructure/repositories/user-terms-acceptance.repository"

@Module({
    imports: [
        TypeOrmModule.forFeature([Terms, UserTermsAcceptance]),
        AuthModule
    ],
    controllers: [TermsController],
    providers: [
        {
            provide: TERMS_REPOSITORY,
            useClass: TermsRepository
        },
        {
            provide: USER_TERMS_ACCEPTANCE_REPOSITORY,
            useClass: UserTermsAcceptanceRepository
        },
        AcceptTermUseCase,
        GetTermsByTypeUseCase
    ]
})
export class TermsModule {}
