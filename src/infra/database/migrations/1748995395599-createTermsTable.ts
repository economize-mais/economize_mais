import { 
    MigrationInterface, 
    QueryRunner, 
    Table, 
    TableForeignKey 
} from "typeorm"

export class CreateTermsTable1748995395599 implements MigrationInterface {

    private acceptTermsTable: string = "user_terms_acceptance"
    private termsTable: string = "terms"
    private userTable: string = "users"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.termsTable,
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true,
                    },
                    {
                        name: "version",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "type",
                        type: "varchar",
                        isNullable: false,
                        comment: "'USAGE' para Termos de Uso, 'PRIVACY' para Política de Privacidade",
                    },
                    {
                        name: "content_html",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    }
                ]
            })
        )

        await queryRunner.createTable(
            new Table({
                name: this.acceptTermsTable,
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true,
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "terms_id",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "accepted_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            this.acceptTermsTable,
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.userTable,
                onDelete: "CASCADE"
            })
        )
    
        await queryRunner.createForeignKey(
            this.acceptTermsTable,
            new TableForeignKey({
                columnNames: ["terms_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.termsTable,
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.acceptTermsTable)
        await queryRunner.dropTable(this.termsTable)
    }
}