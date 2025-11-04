import { ApiProperty } from "@nestjs/swagger"

export class TermsResponseDto {
    @ApiProperty({ example: "1" })
    id: number

    @ApiProperty({ example: "Termos de Uso" })
    title: string

    @ApiProperty({ example: '<!DOCTYPE html><html lang="pt-BR">...</html>' })
    html: string
}
