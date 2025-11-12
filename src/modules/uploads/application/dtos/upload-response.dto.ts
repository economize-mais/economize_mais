import { ApiProperty } from "@nestjs/swagger"

export class UploadResponseDto {
    @ApiProperty({
        example:
            "https://economizemais-products.s3.sa-east-1.amazonaws.com/abc123.jpg"
    })
    url: string

    @ApiProperty({ example: "produto.jpg" })
    originalName: string

    @ApiProperty({ example: "image/jpeg" })
    mimeType: string

    @ApiProperty({ example: 24567 })
    size: number
}
