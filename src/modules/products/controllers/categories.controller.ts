import { Controller, Get } from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"

import { CategoriesResponseDto } from "../application/dto/categories-response.dto"
import { GetCategoriesUseCase } from "../application/use-cases/categories.usecase"

@Controller("/api/categories")
@ApiTags("Returns all categories.")
export class CategoriesController {
    constructor(private readonly categories: GetCategoriesUseCase) {}

    @ApiResponse({
        status: 200,
        type: CategoriesResponseDto,
        isArray: true
    })
    @Get()
    async getCategories() {
        return await this.categories.getCategories()
    }
}
