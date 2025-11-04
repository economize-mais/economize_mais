import { IsNotEmpty, IsNumber } from "class-validator"

import { ApiProperty } from "@nestjs/swagger"

export class AcceptTermDto {
    @ApiProperty({ description: "Id do documento lido", example: 1 })
    @IsNumber()
    @IsNotEmpty()
    id: number
}
