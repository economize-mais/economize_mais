import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"

import { User } from "@/modules/users/domain/entities/users.entity"
import { Terms } from "./terms.entity"

@Entity("user_terms_acceptance")
export class UserTermsAcceptance {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: "user_id", type: "uuid" })
    userId: string

    @ManyToOne(() => User, (user) => user.terms, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "user_id" })
    user: User

    @Column({ name: "terms_id" })
    termsId: number

    @ManyToOne(() => Terms, (terms) => terms.acceptTerms, {
        eager: true,
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "terms_id" })
    terms: Terms

    @CreateDateColumn({ name: "accepted_at", type: "timestamp" })
    acceptedAt: Date
}
