// @ApiProperty({ example: "Supermercado Bom Preço", required: false })
//     @IsOptional()
//     @IsString()
//     companyName?: string

//     @ApiProperty({ example: "Bom Preço", required: false })
//     @IsOptional()
//     @IsString()
//     tradeName?: string

//     @ApiProperty({ example: "https://example.com/logo.png", required: false })
//     @IsOptional()
//     @IsString()
//     logoUrl?: string

// @ApiProperty({ example: "Supermercado Bom Preço", required: false })
//     companyName?: string

//     @ApiProperty({ example: "Bom Preço", required: false })
//     tradeName?: string

//     @ApiProperty({ example: "https://example.com/logo.png", required: false })
//     logoUrl?: string

// @ApiResponse({ status: 200, type: UserResponseDto })
// @ApiResponse({ status: 400, description: "Credenciais inválidas" })
// @ApiResponse({ status: 404, description: "E-mail não encontrado" })
// @HttpCode(200)
// @Post("login")
// async login(@Body() signinDto: SigninDto) {
//     return await this.signinUseCase.execute(signinDto)
// }
