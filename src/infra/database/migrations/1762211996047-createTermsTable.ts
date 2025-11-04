import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from "typeorm"

export class CreateTermsTable1762211996047 implements MigrationInterface {
    private acceptTermsTable: string = "user_terms_acceptance"
    private establishmentsTable: string = "establishments"
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
                        isPrimary: true
                    },
                    {
                        name: "version",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "type",
                        type: "varchar",
                        isNullable: false,
                        comment:
                            "'USAGE' para Termos de Uso, 'PRIVACY' para Política de Privacidade"
                    },
                    {
                        name: "content_html",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    }
                ]
            }),
            true
        )

        await queryRunner.createTable(
            new Table({
                name: this.acceptTermsTable,
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "establishment_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "terms_id",
                        type: "integer",
                        isNullable: false
                    },
                    {
                        name: "accepted_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    }
                ]
            }),
            true
        )

        await queryRunner.createForeignKey(
            this.acceptTermsTable,
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.userTable,
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        )

        await queryRunner.createForeignKey(
            this.acceptTermsTable,
            new TableForeignKey({
                columnNames: ["terms_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.termsTable,
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        )

        await queryRunner.createForeignKey(
            this.acceptTermsTable,
            new TableForeignKey({
                columnNames: ["establishment_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.establishmentsTable,
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const acceptTable = await queryRunner.getTable(this.acceptTermsTable)

        if (acceptTable) {
            const userFk = acceptTable.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("user_id") !== -1
            )
            const termsFk = acceptTable.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("terms_id") !== -1
            )
            const establishmentFk = acceptTable.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("establishment_id") !== -1
            )

            if (userFk)
                await queryRunner.dropForeignKey(this.acceptTermsTable, userFk)

            if (termsFk)
                await queryRunner.dropForeignKey(this.acceptTermsTable, termsFk)

            if (establishmentFk)
                await queryRunner.dropForeignKey(
                    this.acceptTermsTable,
                    establishmentFk
                )
        }

        await queryRunner.dropTable(this.acceptTermsTable, true)
        await queryRunner.dropTable(this.termsTable, true)
    }
}
