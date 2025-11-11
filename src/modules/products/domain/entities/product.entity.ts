import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"

import { Establishment } from "@/modules/establishments/domain/entities/establishment.entity"

import { Category } from "./category.entity"

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "name", type: "varchar", length: 150 })
    name: string

    @Column({ name: "description", type: "text", nullable: true })
    description?: string

    @Column({
        name: "price_original",
        type: "numeric",
        precision: 10,
        scale: 2,
        nullable: false
    })
    priceOriginal: number

    @Column({
        name: "price_offer",
        type: "numeric",
        precision: 10,
        scale: 2,
        nullable: false
    })
    priceOffer: number

    @Column({
        name: "discount_percent",
        type: "numeric",
        precision: 5,
        scale: 2,
        nullable: false
    })
    discountPercent: number

    @Column({ name: "offer_expiration", type: "date", nullable: false })
    offerExpiration: Date

    @Column({ name: "image_url", type: "text", nullable: true })
    imageUrl?: string

    @Column({ name: "display_order", type: "integer", default: 0 })
    displayOrder: number

    @Column({ name: "is_active", type: "boolean", default: true })
    isActive: boolean

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date

    @Column({ name: "category_id", type: "uuid" })
    categoryId: string

    @Column({ name: "establishment_id", type: "uuid" })
    establishmentId: string

    @ManyToOne(() => Category, (category) => category.products, {
        onDelete: "CASCADE",
        eager: true
    })
    @JoinColumn({ name: "category_id" })
    category: Category

    @ManyToOne(() => Establishment, (establishment) => establishment.products, {
        onDelete: "CASCADE",
        eager: false
    })
    @JoinColumn({ name: "establishment_id" })
    establishment: Establishment
}
