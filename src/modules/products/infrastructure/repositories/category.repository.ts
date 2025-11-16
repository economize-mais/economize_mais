import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"

import { BaseRepository } from "@/common/base/base.repository"

import { Category } from "../../domain/entities/category.entity"
import { ICategoryRepository } from "../../domain/interfaces/category-repository.interface"

@Injectable()
export class CategoryRepository
    extends BaseRepository<Category>
    implements ICategoryRepository
{
    constructor(
        @InjectRepository(Category)
        private readonly repo: Repository<Category>
    ) {
        super(repo)
    }

    async getAllDisplayOrderBy(): Promise<Category[]> {
        return this.repo.find({
            where: { isActive: true },
            order: { displayOrder: "ASC" }
        })
    }
}
