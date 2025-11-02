import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

import { UserOrigin } from "./user-origin.entity"

@Entity("origin")
export class Origin {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "bool", nullable: false, default: true })
    status: boolean

    @Column({ type: "varchar", nullable: false })
    description: string

    @Column({ name: "created_at", type: "timestamp" })
    createdAt: Date

    @OneToMany(() => UserOrigin, (userOrigin) => userOrigin.origin)
    userOrigins: UserOrigin
}
