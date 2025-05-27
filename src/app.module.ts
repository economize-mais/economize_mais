import { ConfigModule } from "@nestjs/config"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { UserModule } from "./modules/users/users.module"
import * as path from "path"

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            ssl: false,
            entities: [path.resolve(__dirname, "./database/models/*{.js,.ts}")],
            synchronize: false
        }),
        UserModule
    ]
})

export class AppModule {}