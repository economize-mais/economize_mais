import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class UpdatePasswordDto {
    @ApiProperty({ description: "Nova senha do usuário" })
    @IsString()
    @IsNotEmpty()
    newPassword: string

    @ApiProperty({ description: "Senha atual do usuário" })
    @IsString()
    @IsNotEmpty()
    oldPassword: string
}
