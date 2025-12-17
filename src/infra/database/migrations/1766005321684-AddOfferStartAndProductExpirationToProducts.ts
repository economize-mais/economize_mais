import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableIndex
} from "typeorm"

export class AddOfferStartAndProductExpirationToProducts1766005321684
    implements MigrationInterface
{
    private tableName = "products"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(this.tableName, [
            new TableColumn({
                name: "offer_start_date",
                type: "date",
                isNullable: true
            }),
            new TableColumn({
                name: "product_expiration_date",
                type: "date",
                isNullable: true
            })
        ])

        await queryRunner.query(`
            UPDATE "${this.tableName}"
            SET "offer_start_date" = CURRENT_DATE
            WHERE "offer_start_date" IS NULL
        `)

        await queryRunner.changeColumn(
            this.tableName,
            "offer_start_date",
            new TableColumn({
                name: "offer_start_date",
                type: "date",
                isNullable: false,
                default: "CURRENT_DATE"
            })
        )

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_products_offer_window",
                columnNames: [
                    "establishment_id",
                    "is_active",
                    "offer_start_date",
                    "offer_expiration"
                ]
            })
        )

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_products_product_expiration",
                columnNames: ["product_expiration_date"]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(
            this.tableName,
            "IDX_products_product_expiration"
        )
        await queryRunner.dropIndex(this.tableName, "IDX_products_offer_window")

        await queryRunner.dropColumn(this.tableName, "product_expiration_date")
        await queryRunner.dropColumn(this.tableName, "offer_start_date")
    }
}
