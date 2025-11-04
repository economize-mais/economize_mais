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
import { User } from "@/modules/users/domain/entities/users.entity"

@Entity("addresses")
export class Address {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "uuid", nullable: true })
    user_id?: string

    @Column({ type: "uuid", nullable: true })
    establishment_id?: string

    @Column({ type: "varchar" })
    street: string

    @Column({ type: "varchar", nullable: true })
    number?: string

    @Column({ type: "varchar", nullable: true })
    neighborhood?: string

    @Column({ type: "varchar" })
    city: string

    @Column({ type: "varchar", length: 2 })
    state: string

    @Column({ type: "varchar", nullable: true })
    complement?: string

    @Column({ type: "varchar", length: 10 })
    zipcode: string

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date

    @ManyToOne(() => User, (user) => user.addresses, {
        orphanedRowAction: "delete",
        nullable: true
    })
    @JoinColumn({ name: "user_id" })
    user: User

    @ManyToOne(() => Establishment, (est) => est.addresses, {
        orphanedRowAction: "delete",
        nullable: true
    })
    @JoinColumn({ name: "establishment_id" })
    establishment?: Establishment
}
