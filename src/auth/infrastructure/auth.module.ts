import { JwtModule } from "@nestjs/jwt"
import { Module } from "@nestjs/common"

import { AUTH_SERVICE } from "./interfaces/auth-service.interface"
import { AuthService } from "./auth.service"
import { ENV_CONFIG } from "@/common/env-config/interfaces/env-config.interface"
import { EnvConfigModule } from "@/common/env-config/env-config.module"
import { EnvConfigService } from "@/common/env-config/env-config.service"

@Module({
    imports: [
        EnvConfigModule,
        JwtModule.registerAsync({
            imports: [
                EnvConfigModule
            ],
            useFactory: async (config: EnvConfigService) => ({
                global: true,
                secret: config.getJwtSecret(),
                signOptions: {
                    expiresIn: config.getJwtExpiresInSeconds()
                }
            }),
            inject: [
                ENV_CONFIG
            ]
        })
    ],
    providers: [
        {
            provide: AUTH_SERVICE,
            useClass: AuthService
        }
    ],
    exports: [
        AUTH_SERVICE
    ]
})

export class AuthModule {}