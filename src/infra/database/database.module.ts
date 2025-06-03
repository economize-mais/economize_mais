import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule } from "@nestjs/config"
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
            extra: process.env.DATABASE_SSL === "true"
                ? {
                    ssl: { rejectUnauthorized: false },
                    sslmode: "require"
                }
                : {
                    ssl: false
                },
            entities: [path.resolve(__dirname, "../../modules/**/domain/entities/*.entity{.ts,.js}")],
            synchronize: false
        })
    ]
})

export class DatabaseModule {}