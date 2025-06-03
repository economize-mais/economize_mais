import { Module } from "@nestjs/common"

import { DatabaseModule } from "./infra/database/database.module"
import { UserModule } from "./modules/users/users.module"
import { ZipCodeModule } from "./modules/zip-code/zip-code.module"

@Module({
    imports: [
        DatabaseModule,
        UserModule,
        ZipCodeModule
    ]
})

export class AppModule {}