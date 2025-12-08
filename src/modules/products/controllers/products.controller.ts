import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
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

import { UpdateProductDto } from "../application/dto/update-product.dto"
import { CreateProductUseCase } from "../application/use-cases/create-products.usecase"
import { DeleteProductUseCase } from "../application/use-cases/delete-product.use-case"
import { GetProductsUseCase } from "../application/use-cases/products.usecase"
import { UpdateProductUseCase } from "../application/use-cases/update-product.use-case"

@Controller("api/products")
@ApiTags("Returns all categories and products linked to an establishment.")
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ProductsController {
    constructor(
        private readonly createProduct: CreateProductUseCase,
        private readonly deleteProduct: DeleteProductUseCase,
        private readonly getProducts: GetProductsUseCase,
        private readonly updateProduct: UpdateProductUseCase
    ) {}

    @ApiResponse({
        status: 200,
        type: CategoryProductsResponseDto,
        isArray: true
    })
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "Id não encontrado" })
    @Get("establishment/:id")
    async getProductsByEstablishment(@Param("id") establishmentId: string) {
        return await this.getProducts.getProductsByEstablishment(
            establishmentId
        )
    }

    @ApiResponse({
        status: 200,
        type: CreateProductDto,
        isArray: false
    })
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "Id não encontrado" })
    @Post()
    async create(@User() user: JwtPayload, @Body() product: CreateProductDto) {
        if (user.type !== "COMPANY")
            throw new UnauthorizedException("Acesso não autorizado")

        return await this.createProduct.execute(user.sub, product)
    }

    @ApiResponse({
        status: 200,
        type: CreateProductDto,
        isArray: false
    })
    @ApiResponse({ status: 401, description: "Acesso não autorizado" })
    @ApiResponse({ status: 404, description: "Id não encontrado" })
    @Patch(":id")
    async update(
        @Param("id") id: string,
        @User() user: JwtPayload,
        @Body() dto: UpdateProductDto
    ) {
        if (user.type !== "COMPANY")
            throw new UnauthorizedException("Acesso não autorizado")

        return this.updateProduct.execute(id, user.sub, dto)
    }

    @Delete(":id")
    async remove(
        @Param("id") id: string,
        @User() user: JwtPayload
    ): Promise<{ message: string }> {
        if (user.type !== "COMPANY")
            throw new UnauthorizedException("Acesso não autorizado")

        await this.deleteProduct.execute(id, user.sub)
        return { message: "Produto removido com sucesso" }
    }
}
