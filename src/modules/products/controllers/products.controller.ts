import { Controller, Get, Param, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger"

import { AuthGuard } from "@/auth/infrastructure/auth.guard"

import { CategoryProductsResponseDto } from "../application/dto/category-products-response.dto"
import { GetProductsUseCase } from "../application/use-cases/products.usecase"

@Controller("/api/products")
@ApiTags("Returns all categories and products linked to an establishment.")
export class ProductsController {
    constructor(private readonly getProducts: GetProductsUseCase) {}

    @ApiBearerAuth()
    @ApiResponse({
        status: 200,
        type: CategoryProductsResponseDto,
        isArray: true
    })
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "Id não encontrado" })
    @UseGuards(AuthGuard)
    @Get("establishment/:id")
    async getProductsByEstablishment(@Param("id") establishmentId: string) {
        return await this.getProducts.getProductsByEstablishment(
            establishmentId
        )
    }
}
