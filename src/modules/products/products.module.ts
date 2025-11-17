import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AuthModule } from "@/auth/infrastructure/auth.module"
import { CommonModule } from "@/common/common.module"

import { GetCategoriesUseCase } from "./application/use-cases/categories.usecase"
import { CreateProductUseCase } from "./application/use-cases/create-products.usecase"
import { GetProductsUseCase } from "./application/use-cases/products.usecase"

import { CategoriesController } from "./controllers/categories.controller"
import { ProductsController } from "./controllers/products.controller"

import { Category } from "./domain/entities/category.entity"
import { Product } from "./domain/entities/product.entity"
import { CATEGORY_REPOSITORY } from "./domain/interfaces/category-repository.interface"
import { PRODUCTS_REPOSITORY } from "./domain/interfaces/product-repository.interface"

import { CategoryRepository } from "./infrastructure/repositories/category.repository"
import { ProductRepository } from "./infrastructure/repositories/product.repository"

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Product]),
        AuthModule,
        CommonModule
    ],
    controllers: [CategoriesController, ProductsController],
    providers: [
        GetCategoriesUseCase,
        CreateProductUseCase,
        GetProductsUseCase,
        {
            provide: CATEGORY_REPOSITORY,
            useClass: CategoryRepository
        },
        {
            provide: PRODUCTS_REPOSITORY,
            useClass: ProductRepository
        }
    ]
})
export class ProductsModule {}
