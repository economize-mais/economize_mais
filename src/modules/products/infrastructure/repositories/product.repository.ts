import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm"

import { BaseRepository } from "@/common/base/base.repository"

import { Product } from "../../domain/entities/product.entity"
import { IProductRepository } from "../../domain/interfaces/product-repository.interface"

@Injectable()
export class ProductRepository
    extends BaseRepository<Product>
    implements IProductRepository
{
    constructor(
        @InjectRepository(Product)
        private readonly repo: Repository<Product>
    ) {
        super(repo)
    }

    async getDisplayOrder(
        establishmentId: string,
        categoryId: string
    ): Promise<number> {
        const product = await this.repo.findOne({
            where: {
                establishmentId,
                categoryId
            },
            order: { displayOrder: "DESC" }
        })

        return ++product.displayOrder
    }

    async getProductsByEstablishment(
        establishmentId: string
    ): Promise<Record<string, Product[]>> {
        const currentDate = new Date()

        const products = await this.repo.find({
            where: {
                establishmentId,
                isActive: true,
                offerStartDate: LessThanOrEqual(currentDate),
                offerExpiration: MoreThanOrEqual(currentDate)
            },
            order: { category: { displayOrder: "ASC" }, displayOrder: "ASC" }
        })

        return products.reduce(
            (acc, product) => {
                const categoryName = product.category?.name || "Outros"
                if (!acc[categoryName]) acc[categoryName] = []
                acc[categoryName].push(product)
                return acc
            },
            {} as Record<string, Product[]>
        )
    }
}
