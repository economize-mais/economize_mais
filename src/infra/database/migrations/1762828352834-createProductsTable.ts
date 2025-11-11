import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
    TableIndex
} from "typeorm"

export class CreateProductsTable1762828352834 implements MigrationInterface {
    private tableName = "products"

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
                        name: "establishment_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "category_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "150",
                        isNullable: false
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "price_original",
                        type: "numeric",
                        precision: 10,
                        scale: 2,
                        isNullable: false
                    },
                    {
                        name: "price_offer",
                        type: "numeric",
                        precision: 10,
                        scale: 2,
                        isNullable: false
                    },
                    {
                        name: "discount_percent",
                        type: "numeric",
                        precision: 5,
                        scale: 2,
                        isNullable: false
                    },
                    {
                        name: "offer_expiration",
                        type: "date",
                        isNullable: false
                    },
                    {
                        name: "image_url",
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
                name: "IDX_products_name",
                columnNames: ["name"]
            })
        )

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_products_establishment_id",
                columnNames: ["establishment_id"]
            })
        )

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_products_category_id",
                columnNames: ["category_id"]
            })
        )

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_products_offer_expiration",
                columnNames: ["offer_expiration"]
            })
        )

        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                columnNames: ["establishment_id"],
                referencedTableName: "establishments",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE"
            })
        )

        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                columnNames: ["category_id"],
                referencedTableName: "categories",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(this.tableName)

        const foreignKeys = table.foreignKeys.filter(
            (fk) =>
                fk.columnNames.includes("establishment_id") ||
                fk.columnNames.includes("category_id")
        )

        for (const fk of foreignKeys) {
            await queryRunner.dropForeignKey(this.tableName, fk)
        }

        await queryRunner.dropIndex(
            this.tableName,
            "IDX_products_offer_expiration"
        )
        await queryRunner.dropIndex(this.tableName, "IDX_products_category_id")
        await queryRunner.dropIndex(
            this.tableName,
            "IDX_products_establishment_id"
        )
        await queryRunner.dropIndex(this.tableName, "IDX_products_name")

        await queryRunner.dropTable(this.tableName)
    }
}
