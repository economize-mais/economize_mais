import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class CreateEstablishmentsTable1762211451608
    implements MigrationInterface
{
    private tableName: string = "establishments"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "type",
                        type: "varchar",
                        isNullable: false,
                        comment: "'COMPANY' for supermarkets"
                    },
                    {
                        name: "display_order",
                        type: "integer",
                        default: 0
                    },
                    {
                        name: "company_name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "trade_name",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "cnpj",
                        type: "varchar",
                        length: "18",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        length: "20",
                        isNullable: false,
                        default: "'(35)99999-9999'"
                    },
                    {
                        name: "logo_url",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            }),
            true
        )

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_establishments_email",
                columnNames: ["email"]
            })
        )

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_establishments_cnpj",
                columnNames: ["cnpj"]
            })
        )

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_establishments_display_order",
                columnNames: ["display_order"]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(
            this.tableName,
            "IDX_establishments_display_order"
        )
        await queryRunner.dropIndex(this.tableName, "IDX_establishments_cnpj")
        await queryRunner.dropIndex(this.tableName, "IDX_establishments_email")

        await queryRunner.dropTable(this.tableName)
    }
}
