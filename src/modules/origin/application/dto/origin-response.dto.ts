import { ApiProperty } from "@nestjs/swagger"

export class OriginResponseDto {
    @ApiProperty({ example: "1" })
    id: number

    @ApiProperty({ example: "Vi no Instagram" })
    description: string
}
