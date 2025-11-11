import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"

import { Product } from "./product.entity"

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 100 })
    name: string

    @Column({ type: "text", nullable: true })
    description?: string

    @Column({ name: "display_order", type: "integer", default: 0 })
    displayOrder: number

    @Column({ name: "is_active", type: "boolean", default: true })
    isActive: boolean

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date

    @OneToMany(() => Product, (product) => product.category, {
        cascade: ["update"],
        eager: false
    })
    products: Product[]
}
