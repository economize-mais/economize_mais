import { join } from "node:path"
import { 
    ConfigModule, 
    ConfigModuleOptions 
} from "@nestjs/config"
import { 
    DynamicModule, 
    Module 
} from "@nestjs/common"

import { ENV_CONFIG } from "./interfaces/env-config.interface"
import { EnvConfigService } from "./env-config.service"

@Module({
    imports: [
        ConfigModule
    ],
    providers: [
        {
            provide: ENV_CONFIG,
            useClass: EnvConfigService
        }
    ],
    exports: [
        ENV_CONFIG
    ]
})

export class EnvConfigModule extends ConfigModule {
    static forRoot(options?: ConfigModuleOptions): Promise<DynamicModule> {
        return super.forRoot({
            ...options,
            envFilePath: [
                join(__dirname, `../../../.env`)
            ]
        })
    }
}