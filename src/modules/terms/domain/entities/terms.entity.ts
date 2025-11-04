import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm"

import { UserTermsAcceptance } from "./user-terms-acceptance.entity"

@Entity("terms")
export class Terms {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar" })
    version: string

    @Column({
        type: "varchar",
        comment:
            "'USAGE' para Termos de Uso, 'PRIVACY' para Política de Privacidade"
    })
    type: string

    @Column({ name: "content_html", type: "text" })
    contentHtml: string

    @CreateDateColumn({ name: "created_at", type: "timestamp" })
    createdAt: Date

    @OneToMany(() => UserTermsAcceptance, (termsAccept) => termsAccept.terms, {
        cascade: true
    })
    acceptTerms: UserTermsAcceptance[]
}
