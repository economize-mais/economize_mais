import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"

import { Product } from "@/modules/products/domain/entities/product.entity"
import { Address } from "@/modules/shared/domain/entities/addresses.entity"
import { UserType } from "@/modules/shared/enums/user-type.enum"
import { UserTermsAcceptance } from "@/modules/terms/domain/entities/user-terms-acceptance.entity"

import { EstablishmentTypeLinks } from "./establishment-type-links.entity"

@Entity("establishments")
export class Establishment {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "is_active", type: "boolean" })
    isActive: boolean

    @Column({ type: "varchar" })
    type: UserType

    @Column({ name: "display_order", type: "int4" })
    displayOrder: number

    @Column({ name: "company_name", type: "varchar" })
    companyName: string

    @Column({ name: "trade_name", type: "varchar" })
    tradeName: string

    @Column({ type: "varchar", unique: true })
    email: string

    @Column({ type: "varchar" })
    password: string

    @Column({ type: "varchar", length: 18, unique: true })
    cnpj: string

    @Column({ type: "varchar", length: 20 })
    phone: string

    @Column({ name: "logo_url", type: "text" })
    logoUrl: string

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date

    @OneToMany(() => Address, (address) => address.establishment, {
        eager: true,
        cascade: true
    })
    addresses?: Address[]

    @OneToMany(() => UserTermsAcceptance, (terms) => terms.establishment, {
        eager: true,
        cascade: true
    })
    terms?: UserTermsAcceptance[]

    @OneToMany(() => EstablishmentTypeLinks, (link) => link.establishment)
    typeLinks: EstablishmentTypeLinks[]

    @OneToMany(() => Product, (product) => product.establishment, {
        cascade: true,
        eager: false
    })
    products: Product[]
}
