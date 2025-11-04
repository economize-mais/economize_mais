import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SigninDto {
    @ApiProperty({
        description: "Email do usuário"
    })
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        description: "Senha do usuário"
    })
    @IsString()
    @IsNotEmpty()
    password: string
}
