import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UnauthorizedException,
    UseGuards
} from "@nestjs/common"
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger"

import { AuthGuard } from "@/auth/infrastructure/auth.guard"
import { JwtPayload } from "@/auth/infrastructure/interfaces/jwt-payload.interface"

import { User } from "@/common/decorators/user.decorator"

import { CategoryProductsResponseDto } from "../application/dto/category-products-response.dto"
import { CreateProductDto } from "../application/dto/create-product.dto"

import { CreateProductUseCase } from "../application/use-cases/create-products.usecase"
import { GetProductsUseCase } from "../application/use-cases/products.usecase"

@Controller("/api/products")
@ApiTags("Returns all categories and products linked to an establishment.")
export class ProductsController {
    constructor(
        private readonly createProduct: CreateProductUseCase,
        private readonly getProducts: GetProductsUseCase
    ) {}

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

    @ApiBearerAuth()
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "Id não encontrado" })
    @UseGuards(AuthGuard)
    @Post()
    async create(@User() user: JwtPayload, @Body() product: CreateProductDto) {
        if (user.type !== "COMPANY")
            return new UnauthorizedException("Acesso não autorizado")

        return await this.createProduct.execute(user.sub, product)
    }
}
