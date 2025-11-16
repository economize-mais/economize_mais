import { Category } from "../../domain/entities/category.entity"
import { CategoriesResponseDto } from "../dto/categories.dto"

export const categoriesToResponse = (
    category: Category
): CategoriesResponseDto => {
    const dto = new CategoriesResponseDto()

    dto.id = category.id
    dto.name = category.name

    return dto
}
