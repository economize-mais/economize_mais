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
    ssl: false,
    // entities: [path.resolve(__dirname, "../database/models/*{.js,.ts}")],
    migrations: [path.resolve(__dirname, "../database/migrations/*{.js,.ts}")],
    synchronize: false
})