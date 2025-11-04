import { Module } from "@nestjs/common"

import { AuthModule } from "@/auth/infrastructure/auth.module"
import { AxiosProvider } from "@/common/providers/axios.provider"

import { GetZipCodeUseCase } from "./application/use-cases/get-zip-code.use-cases"
import { ZipCodeController } from "./zip-code.controller"

@Module({
    imports: [AuthModule],
    controllers: [ZipCodeController],
    providers: [AxiosProvider, GetZipCodeUseCase]
})
export class ZipCodeModule {}
