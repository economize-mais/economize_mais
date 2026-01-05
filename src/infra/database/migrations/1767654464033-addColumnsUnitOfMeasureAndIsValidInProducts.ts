import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddColumnsUnitOfMeasureAndIsValidInProducts1767654464033
    implements MigrationInterface
{
    private tableName = "products"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(this.tableName, [
            new TableColumn({
                name: "weight",
                type: "numeric",
                precision: 5,
                scale: 2,
                isNullable: true
            }),
            new TableColumn({
                name: "unit_of_measure",
                type: "varchar",
                isNullable: true
            }),
            new TableColumn({
                name: "product_has_expiration_date",
                type: "boolean",
                default: false,
                isNullable: true
            })
        ])

        await queryRunner.query(`
            UPDATE "${this.tableName}"
            SET "weight" = 1
            WHERE "weight" IS NULL
        `)

        await queryRunner.query(`
            UPDATE "${this.tableName}"
            SET "unit_of_measure" = 'LT'
            WHERE "unit_of_measure" IS NULL
        `)

        await queryRunner.query(`
            UPDATE "${this.tableName}"
            SET "product_has_expiration_date" = true
            WHERE "product_expiration_date" IS NOT NULL
        `)

        await queryRunner.changeColumn(
            this.tableName,
            "weight",
            new TableColumn({
                name: "weight",
                type: "numeric",
                precision: 5,
                scale: 2,
                isNullable: false
            })
        )

        await queryRunner.changeColumn(
            this.tableName,
            "unit_of_measure",
            new TableColumn({
                name: "unit_of_measure",
                type: "varchar",
                isNullable: false
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(this.tableName, "weight")
        await queryRunner.dropColumn(this.tableName, "unit_of_measure")
        await queryRunner.dropColumn(
            this.tableName,
            "product_has_expiration_date"
        )
    }
}
