import { BadRequestException } from "@nestjs/common"

import { CreateProductDto } from "../../application/dto/create-product.dto"
import { Product } from "../entities/product.entity"

export class ProductValidator {
    static validate(dto: CreateProductDto | Product): void {
        if (dto.offerStartDate > dto.offerExpiration)
            throw new BadRequestException(
                "A data de início da oferta não pode ser maior que a data de término"
            )

        if (
            dto.productExpirationDate &&
            dto.productExpirationDate < dto.offerStartDate
        )
            throw new BadRequestException(
                "A validade do produto não pode ser anterior ao início da oferta"
            )
    }
}
