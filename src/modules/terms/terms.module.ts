import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { Terms } from "./domain/entities/terms.entity"
import { TERMS_REPOSITORY } from "./domain/interfaces/terms-repository.interface"
import { TermsRepository } from "./infrastructure/repositories/terms.repository"
import { UserTermsAcceptance } from "./domain/entities/user-terms-acceptance.entity"
import { USER_TERMS_ACCEPTANCE_REPOSITORY } from "./domain/interfaces/user-terms-acceptance-repository.interface"
import { UserTermsAcceptanceRepository } from "./infrastructure/repositories/user-terms-acceptance.repository"

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Terms, 
            UserTermsAcceptance
        ])
    ],
    providers: [
        {
            provide: TERMS_REPOSITORY,
            useClass: TermsRepository
        },
        {
            provide: USER_TERMS_ACCEPTANCE_REPOSITORY,
            useClass: UserTermsAcceptanceRepository
        }
    ],
    exports: [
        TERMS_REPOSITORY,
        USER_TERMS_ACCEPTANCE_REPOSITORY
    ]
})

export class TermsModule {}