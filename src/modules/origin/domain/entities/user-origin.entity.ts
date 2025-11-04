import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"

import { User } from "@/modules/users/domain/entities/users.entity"

import { Origin } from "./origin.entity"

@Entity("user_origin")
export class UserOrigin {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "uuid" })
    user_id: string

    @Column({ type: "int4" })
    origin_id: number

    @CreateDateColumn({ name: "accepted_at", type: "timestamp" })
    acceptedAt: Date

    @ManyToOne(() => User, (user) => user.userOrigin, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User

    @ManyToOne(() => Origin, (origin) => origin.userOrigins, {
        onDelete: "CASCADE",
        eager: true
    })
    @JoinColumn({ name: "origin_id" })
    origin: Origin
}
