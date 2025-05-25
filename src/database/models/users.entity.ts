import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn 
} from "typeorm"

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
    gender?: "M" | "F"

    @Column({ name: "user_type", comment: "'USER' for normal users, 'COMPANY' for supermarkets" })
    userType: "USER" | "COMPANY"

    @Column({ name: "company_name", nullable: true })
    companyName?: string

    @Column({ name: "trade_name", nullable: true })
    tradeName?: string

    @Column({ name: "logo_url", nullable: true })
    logoUrl?: string

    @CreateDateColumn({ name: "created_at" })
    createdAt: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt: Date
}