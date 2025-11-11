import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class CreateCategoriesTable1762828191078 implements MigrationInterface {
    private tableName = "categories"

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
                        name: "is_active",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    }
                ]
            }),
            true
        )

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_categories_name",
                columnNames: ["name"]
            })
        )

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_categories_display_order",
                columnNames: ["display_order"]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(
            this.tableName,
            "IDX_categories_display_order"
        )
        await queryRunner.dropIndex(this.tableName, "IDX_categories_name")
        await queryRunner.dropTable(this.tableName)
    }
}
