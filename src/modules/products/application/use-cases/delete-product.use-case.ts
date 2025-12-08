import { Inject, Injectable, NotFoundException } from "@nestjs/common"

import { S3UploadService } from "@/modules/uploads/infrastructure/services/s3-upload.service"

import {
    IProductRepository,
    PRODUCTS_REPOSITORY
} from "../../domain/interfaces/product-repository.interface"

@Injectable()
export class DeleteProductUseCase {
    constructor(
        @Inject(PRODUCTS_REPOSITORY)
        private readonly productsRepo: IProductRepository,
        private readonly s3UploadService: S3UploadService
    ) {}

    async execute(id: string, establishmentId: string): Promise<void> {
        const product = await this.productsRepo.findOne({
            where: {
                id,
                establishmentId
            }
        })

        if (!product) throw new NotFoundException("Produto não encontrado")

        if (product.imageUrl) {
            const fileKey = this.getKeyFromUrl(product.imageUrl)
            if (fileKey) await this.s3UploadService.deleteFile(fileKey)
        }

        await this.productsRepo.delete(product.id)
    }

    private getKeyFromUrl(url: string): string | null {
        try {
            const parsed = new URL(url)
            return parsed.pathname.replace(/^\/+/, "")
        } catch {
            return null
        }
    }
}
