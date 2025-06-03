import { DataSource } from "typeorm"

import * as dotenv from "dotenv"
import * as path from "path"

dotenv.config()

export const AppDataSource = new DataSource({
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
    migrations: [path.resolve(__dirname, "../infra/database/migrations/*{.js,.ts}")],
    synchronize: false
})