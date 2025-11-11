import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AuthModule } from "@/auth/infrastructure/auth.module"
import { CommonModule } from "@/common/common.module"

import { GetProductsUseCase } from "./application/use-cases/products.usecase"

import { ProductsController } from "./controllers/products.controller"

import { Category } from "./domain/entities/category.entity"
import { Product } from "./domain/entities/product.entity"
import { PRODUCTS_REPOSITORY } from "./domain/interfaces/product-repository.interface"

import { ProductRepository } from "./infrastructure/repositories/product.repository"

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Product]),
        AuthModule,
        CommonModule
    ],
    controllers: [ProductsController],
    providers: [
        GetProductsUseCase,
        {
            provide: PRODUCTS_REPOSITORY,
            useClass: ProductRepository
        }
    ]
})
export class ProductsModule {}
