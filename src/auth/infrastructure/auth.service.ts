import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { EnvConfigService } from "@/common/env-config/env-config.service"
import { JwtPayload } from "../interfaces/jwt-payload.interface"

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private config: EnvConfigService
    ) {}

    async generateJwt(payload: JwtPayload): Promise<string> {
        return await this.jwtService.signAsync(payload)
    }

    async verifyJwt(token: string): Promise<JwtPayload> {
        return this.jwtService.verifyAsync<JwtPayload>(token, {
            secret: this.config.getJwtSecret()
        })
    }
}