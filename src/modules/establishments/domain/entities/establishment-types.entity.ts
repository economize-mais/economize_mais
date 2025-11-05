import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { EstablishmentTypeLinks } from "./establishment-type-links.entity"

@Entity("establishment_types")
export class EstablishmentTypes {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "is_active", type: "boolean" })
    isActive: boolean

    @Column({ type: "varchar", length: 100 })
    name: string

    @Column({ type: "text" })
    description: string

    @Column({ name: "display_order", type: "int4" })
    displayOrder: number

    @Column({ name: "created_at", type: "timestamp" })
    createdAt: Date

    @Column({ name: "updated_at", type: "timestamp" })
    updatedAt: Date

    @OneToMany(() => EstablishmentTypeLinks, (link) => link.type, {
        cascade: true,
        eager: true
    })
    typeLinks: EstablishmentTypeLinks[]
}
