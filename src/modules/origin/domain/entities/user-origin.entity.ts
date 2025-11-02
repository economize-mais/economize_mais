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

    @Column({ name: "user_id", type: "uuid" })
    userId: string

    @Column({ name: "origin_id" })
    originId: number

    @CreateDateColumn({
        name: "accepted_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP"
    })
    acceptedAt: Date

    @ManyToOne(() => User, (user) => user.userOrigin, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User

    @ManyToOne(() => Origin, (origin) => origin.userOrigins, {
        eager: true,
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "origin_id" })
    origin: Origin
}
