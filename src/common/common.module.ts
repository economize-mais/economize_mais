import { Module } from "@nestjs/common"

import { HASH_SERVICE } from "./hash/interfaces/hash-service.interface"
import { HashService } from "./hash/hash.service"

@Module({
    providers: [
        {
            provide: HASH_SERVICE,
            useClass: HashService
        }
    ],
    exports: [
        HASH_SERVICE
    ]
})

export class CommonModule {}