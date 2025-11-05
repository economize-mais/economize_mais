import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class CreateEstablishmentTypesTable1762304252327
    implements MigrationInterface
{
    private tableName = "establishment_types"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "display_order",
                        type: "integer",
                        default: 0
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
                name: "IDX_establishment_types_name",
                columnNames: ["name"]
            })
        )

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_establishment_types_created_at",
                columnNames: ["created_at"]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(
            this.tableName,
            "IDX_establishment_types_name"
        )
        await queryRunner.dropIndex(
            this.tableName,
            "IDX_establishment_types_created_at"
        )
        await queryRunner.dropTable(this.tableName)
    }
}
