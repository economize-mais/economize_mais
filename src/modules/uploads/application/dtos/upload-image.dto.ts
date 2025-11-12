import { ApiProperty } from "@nestjs/swagger"
import { IsIn } from "class-validator"

import { UploadType } from "../../infrastructure/services/s3-upload.service"

export class UploadImageDto {
    @ApiProperty({
        example: "product",
        enum: ["product", "logo"],
        description: "Tipo de upload (produto ou logo)"
    })
    @IsIn(["product", "logo"])
    type: UploadType
}
