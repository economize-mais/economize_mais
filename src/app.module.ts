import { Module } from "@nestjs/common"

import { DatabaseModule } from "./infra/database/database.module"

import { EstablishmentModule } from "./modules/establishments/establishment.module"
import { SigninModule } from "./modules/login/signin.module"
import { OriginModule } from "./modules/origin/origin.module"
import { TermsModule } from "./modules/terms/terms.module"
import { UserModule } from "./modules/users/users.module"
import { ZipCodeModule } from "./modules/zip-code/zip-code.module"

@Module({
    imports: [
        DatabaseModule,
        EstablishmentModule,
        OriginModule,
        SigninModule,
        TermsModule,
        UserModule,
        ZipCodeModule
    ]
})
export class AppModule {}
