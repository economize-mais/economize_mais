import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"

import { UserOrigin } from "@/modules/origin/domain/entities/user-origin.entity"
import { Address } from "@/modules/shared/domain/entities/addresses.entity"
import { UserType } from "@/modules/shared/enums/user-type.enum"
import { UserTermsAcceptance } from "@/modules/terms/domain/entities/user-terms-acceptance.entity"

import { Gender } from "../enums/gender.enum"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar" })
    type: UserType

    @Column({ type: "varchar" })
    name: string

    @Column({ type: "varchar", unique: true })
    email: string

    @Column()
    password: string

    @Column({ type: "varchar", length: 14, unique: true })
    cpf: string

    @Column({ type: "varchar", length: 20, nullable: false })
    phone: string

    @Column({ name: "birth_date", type: "date", nullable: true })
    birthDate?: Date

    @Column({
        type: "char",
        length: 1,
        nullable: true,
        comment: "M = Male, F = Female"
    })
    gender?: Gender

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
    updatedAt: Date

    @OneToMany(() => Address, (address) => address.user, {
        eager: true,
        cascade: true
    })
    addresses?: Address[]

    @OneToMany(() => UserTermsAcceptance, (terms) => terms.user, {
        eager: true,
        cascade: true
    })
    terms: UserTermsAcceptance[]

    @OneToOne(() => UserOrigin, (userOrigin) => userOrigin.user, {
        eager: true,
        cascade: true
    })
    userOrigin: UserOrigin
}
