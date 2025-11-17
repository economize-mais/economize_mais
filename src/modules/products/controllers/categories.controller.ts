import { Controller, Get, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger"

import { AuthGuard } from "@/auth/infrastructure/auth.guard"

import { CategoriesResponseDto } from "../application/dto/categories-response.dto"
import { GetCategoriesUseCase } from "../application/use-cases/categories.usecase"

@Controller("/api/categories")
@ApiTags("Returns all categories.")
export class CategoriesController {
    constructor(private readonly categories: GetCategoriesUseCase) {}

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        type: CategoriesResponseDto,
        isArray: true
    })
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "Id não encontrado" })
    @UseGuards(AuthGuard)
    @Get()
    async getCategories() {
        return await this.categories.getCategories()
    }
}
