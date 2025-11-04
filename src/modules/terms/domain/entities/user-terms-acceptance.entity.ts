import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"

import { Establishment } from "@/modules/establishments/domain/entities/establishment.entity"
import { User } from "@/modules/users/domain/entities/users.entity"

import { Terms } from "./terms.entity"

@Entity("user_terms_acceptance")
export class UserTermsAcceptance {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "uuid", nullable: true })
    user_id?: string

    @Column({ type: "uuid", nullable: true })
    establishment_id?: string

    @Column({ type: "int4" })
    terms_id: number

    @CreateDateColumn({ name: "accepted_at", type: "timestamp" })
    acceptedAt: Date

    @ManyToOne(() => User, (user) => user.terms, {
        onDelete: "CASCADE",
        nullable: true
    })
    @JoinColumn({ name: "user_id" })
    user?: User

    @ManyToOne(() => Establishment, (est) => est.terms, {
        onDelete: "CASCADE",
        nullable: true
    })
    @JoinColumn({ name: "establishment_id" })
    establishment?: Establishment

    @ManyToOne(() => Terms, (terms) => terms.acceptTerms, {
        onDelete: "CASCADE",
        eager: true
    })
    @JoinColumn({ name: "terms_id" })
    terms: Terms
}
