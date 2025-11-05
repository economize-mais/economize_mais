import { Body, Controller, Post } from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"

import { CreateEstablishmentDto } from "../application/dto/create-establishment.dto"
import { EstablishmentResponseDto } from "../application/dto/establishment-response.dto"
import { CreateServiceUseCase } from "../application/use-cases/create-establishment.use-case"

@Controller("/api/establishment")
@ApiTags("Routes for creating and updating establishment data and passwords")
export class EstablishmentController {
    constructor(
        private readonly create: CreateServiceUseCase
        // private readonly updatePass: UpdatePasswordUseCase,
        // private readonly updateUser: UpdateUserUseCase
    ) {}

    @ApiResponse({ status: 201, type: EstablishmentResponseDto })
    @ApiResponse({ status: 409, description: "conflito de e-mail" })
    @ApiResponse({
        status: 422,
        description: "corpo da requisicao com dados inválidos"
    })
    @Post()
    async createEstablishment(@Body() user: CreateEstablishmentDto) {
        return await this.create.execute(user)
    }

    // @ApiBearerAuth()
    // @HttpCode(HttpStatus.NO_CONTENT)
    // @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    // @ApiResponse({ status: 404, description: "Id não encontrado" })
    // @ApiResponse({
    //     status: 422,
    //     description: "Corpo da requisição com dados inválidos"
    // })
    // @UseGuards(AuthGuard)
    // @Patch("update-password")
    // async updatePassword(
    //     @User() user: JwtPayload,
    //     @Body() updatePasswordDto: UpdatePasswordDto
    // ) {
    //     return await this.updatePass.execute(user.sub, updatePasswordDto)
    // }

    // @ApiBearerAuth()
    // @ApiResponse({ status: 200, type: UserResponseDto })
    // @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    // @ApiResponse({ status: 404, description: "Id não encontrado" })
    // @ApiResponse({
    //     status: 422,
    //     description: "corpo da requisicao com dados inválidos"
    // })
    // @UseGuards(AuthGuard)
    // @Put()
    // async update(
    //     @User() user: JwtPayload,
    //     @Body() updateUserdto: UpdateUserDto
    // ) {
    //     return await this.updateUser.execute(user.sub, updateUserdto)
    // }
}
