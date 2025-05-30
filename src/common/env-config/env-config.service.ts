import { ConfigService } from "@nestjs/config"
import { Injectable } from "@nestjs/common"

import { EnvConfig } from "./env-config.interface"

@Injectable()
export class EnvConfigService implements EnvConfig {

    constructor(
        private configService: ConfigService
    ){}

    getJwtSecret(): string {
        return this.configService.get<string>("JWT_SECRET")
    }

    getJwtExpiresInSeconds(): number {
        return Number(this.configService.get<number>("JWT_EXPIRES_IN"))
    }
}