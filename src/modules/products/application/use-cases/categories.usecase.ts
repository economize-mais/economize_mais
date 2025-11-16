import { Inject, Injectable } from "@nestjs/common"

import {
    CATEGORY_REPOSITORY,
    ICategoryRepository
} from "../../domain/interfaces/category-repository.interface"

import { CategoriesResponseDto } from "../dto/categories.dto"
import { categoriesToResponse } from "../presenter/categories.presenter"

@Injectable()
export class GetCategoriesUseCase {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoriesRepo: ICategoryRepository
    ) {}

    async getCategories(): Promise<CategoriesResponseDto[]> {
        const categories = await this.categoriesRepo.getAllDisplayOrderBy()
        return categories.map((category) => categoriesToResponse(category))
    }
}
