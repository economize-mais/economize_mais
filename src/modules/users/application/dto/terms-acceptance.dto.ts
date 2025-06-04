import { ApiProperty } from "@nestjs/swagger"

export class TermsAcceptance {

    @ApiProperty({ example: "true" })
    usage: boolean

    @ApiProperty({ example: "false" })
    privacy: boolean
}