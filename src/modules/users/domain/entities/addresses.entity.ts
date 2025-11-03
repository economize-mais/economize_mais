import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"

import { Establishment } from "./establishment.entity"
import { User } from "./users.entity"

@Entity("addresses")
export class Address {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    street: string

    @Column({ nullable: true })
    number: string

    @Column({ nullable: true })
    complement?: string

    @Column({ nullable: true })
    neighborhood?: string

    @Column()
    city: string

    @Column({ type: "varchar", length: 2 })
    state: string

    @Column({ type: "varchar", length: 10 })
    zipcode: string

    @Column({ type: "uuid", nullable: true })
    user_id?: string

    @ManyToOne(() => User, (user) => user.addresses, {
        orphanedRowAction: "delete"
    })
    @JoinColumn({ name: "user_id" })
    user: User

    @Column({ type: "uuid", nullable: true })
    establishment_id?: string

    @ManyToOne(() => Establishment, (est) => est.addresses, {
        orphanedRowAction: "delete",
        nullable: true
    })
    @JoinColumn({ name: "establishment_id" })
    establishment?: Establishment

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date
}
