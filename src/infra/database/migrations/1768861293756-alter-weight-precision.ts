import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterWeightPrecision1768861293756 implements MigrationInterface {
    private tableName = "products"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            this.tableName,
            "weight",
            new TableColumn({
                name: "weight",
                type: "numeric",
                precision: 10,
                scale: 2,
                isNullable: false
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
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
    }
}
