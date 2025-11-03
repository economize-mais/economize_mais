import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"

import { UserTermsAcceptance } from "@/modules/terms/domain/entities/user-terms-acceptance.entity"
import { Address } from "@/modules/users/domain/entities/addresses.entity"

import { UserType } from "../enums/user-type.enum"

@Entity("establishments")
export class Establishment {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 150 })
    name: string

    @Column({ type: "varchar", unique: true })
    email: string

    @Column({ type: "varchar" })
    password: string

    @Column({ type: "varchar", length: 20, unique: true })
    cnpj: string

    @Column({ type: "varchar", length: 20, nullable: false })
    phone: string

    @Column({
        type: "varchar",
        comment: "'COMPANY' for supermarkets or other business types"
    })
    type: UserType

    @Column({ name: "logo_url", type: "text", nullable: true })
    logoUrl?: string

    @Column({ name: "display_order", type: "integer", default: 0 })
    displayOrder: number

    @Column({ name: "is_active", type: "boolean", default: true })
    isActive: boolean

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

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date
}
