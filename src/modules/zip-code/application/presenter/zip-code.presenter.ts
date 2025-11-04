import { ApiProperty } from "@nestjs/swagger"

import { ViaCepDto } from "../dto/via-cep.dto"

export class ZipCodePresenter {
    @ApiProperty({ example: "Avenida Paulista" })
    street: string

    @ApiProperty({ example: "Bela Vista" })
    neighborhood: string

    @ApiProperty({ example: "São Paulo" })
    city: string

    @ApiProperty({ example: "SP", maxLength: 2 })
    state: string

    @ApiProperty({ example: "01310-001", maxLength: 10 })
    zipcode: string

    static from(viaCepData: ViaCepDto): ZipCodePresenter {
        return {
            street: viaCepData.logradouro,
            neighborhood: viaCepData.bairro,
            city: viaCepData.localidade,
            state: viaCepData.uf,
            zipcode: viaCepData.cep
        } as ZipCodePresenter
    }
}
