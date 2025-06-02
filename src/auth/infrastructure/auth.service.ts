import { 
    Inject, 
    Injectable 
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { 
    ENV_CONFIG, 
    IEnvConfig 
} from "@/common/env-config/interfaces/env-config.interface"
import { IAuthService } from "./interfaces/auth-service.interface"
import { JwtPayload } from "./interfaces/jwt-payload.interface"

@Injectable()
export class AuthService implements IAuthService {

    constructor(
        @Inject(ENV_CONFIG)
        private config: IEnvConfig,
        private jwtService: JwtService
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