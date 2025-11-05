import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"

import { EstablishmentTypes } from "./establishment-types.entity"
import { Establishment } from "./establishment.entity"

@Entity("establishment_type_links")
export class EstablishmentTypeLinks {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "uuid" })
    establishment_id: string

    @Column({ type: "uuid" })
    type_id: string

    @Column({ name: "created_at", type: "timestamp" })
    createdAt: Date

    @ManyToOne(() => Establishment, (est) => est.typeLinks, {
        eager: true,
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "establishment_id" })
    establishment: Establishment

    @ManyToOne(() => EstablishmentTypes, (type) => type.typeLinks, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "type_id" })
    type: EstablishmentTypes
}
