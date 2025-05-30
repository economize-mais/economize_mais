import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { EnvConfigService } from "@/common/env-config/env-config.service"

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private config: EnvConfigService
    ) {}

    async generateJwt(userId: string): Promise<string> {
        return await this.jwtService.signAsync({ id: userId }, {})
    }

    async verifyJwt(token: string) {
        return this.jwtService.verifyAsync(token, {
            secret: this.config.getJwtSecret()
        })
    }
}