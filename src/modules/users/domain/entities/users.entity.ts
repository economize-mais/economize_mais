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
import { UserTermsAcceptance } from "@/modules/terms/domain/entities/user-terms-acceptance.entity"
import { Gender } from "@/modules/users/domain/enums/gender.enum"

import { UserType } from "../enums/user-type.enum"
import { Address } from "./addresses.entity"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "full_name" })
    name: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ name: "cpf", length: 20, unique: true })
    cpf: string

    @Column({ name: "birth_date", type: "date", nullable: true })
    birthDate?: Date

    @Column({
        type: "char",
        length: 1,
        nullable: true,
        comment: "M = Male, F = Female"
    })
    gender?: Gender

    @Column({
        name: "type",
        comment: "'USER' for normal users"
    })
    type: UserType

    @Column({ type: "varchar", length: 20, nullable: false })
    phone: string

    @OneToMany(() => Address, (address) => address.user, {
        nullable: true,
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

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date
}
