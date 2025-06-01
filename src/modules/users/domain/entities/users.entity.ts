import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    OneToMany, 
    PrimaryGeneratedColumn,
    UpdateDateColumn 
} from "typeorm"

import { Address } from "./addresses.entity"
import { Gender } from "@/modules/users/domain/enums/gender.enum"
import { UserType } from "@/modules/users/domain/enums/user-type.enum"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ name: "full_name", nullable: true })
    fullName?: string

    @Column({ name: "cpf_cnpj", length: 20, unique: true })
    cpfCnpj: string

    @Column({ name: "birth_date", type: "date", nullable: true })
    birthDate?: Date

    @Column({ type: "char", length: 1, nullable: true, comment: "M = Male, F = Female" })
    gender?: Gender

    @Column({ name: "user_type", comment: "'USER' for normal users, 'COMPANY' for supermarkets" })
    userType: UserType

    @Column({ name: "company_name", nullable: true })
    companyName?: string

    @Column({ name: "trade_name", nullable: true })
    tradeName?: string

    @Column({ name: "logo_url", nullable: true })
    logoUrl?: string

    @OneToMany(() => Address, (address) => address.user, { eager: true })
    addresses: Address[]

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date
}