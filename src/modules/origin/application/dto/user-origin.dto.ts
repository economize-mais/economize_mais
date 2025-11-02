import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"

export class UserOriginDto {
    @ApiProperty({ description: "Id de onde nos encontrou", example: 1 })
    @IsNumber()
    @IsNotEmpty()
    id: number
}
