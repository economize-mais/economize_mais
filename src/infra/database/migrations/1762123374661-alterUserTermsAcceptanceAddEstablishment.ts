import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey
} from "typeorm"

export class AlterUserTermsAcceptanceAddEstablishment1762123374661
    implements MigrationInterface
{
    private tableName = "user_terms_acceptance"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            this.tableName,
            "user_id",
            new TableColumn({
                name: "user_id",
                type: "uuid",
                isNullable: true
            })
        )

        await queryRunner.addColumn(
            this.tableName,
            new TableColumn({
                name: "establishment_id",
                type: "uuid",
                isNullable: true
            })
        )

        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                columnNames: ["establishment_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "establishments",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
                name: "FK_user_terms_establishment"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(this.tableName)
        const fk = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("establishment_id") !== -1
        )

        if (fk) {
            await queryRunner.dropForeignKey(this.tableName, fk)
        }

        await queryRunner.dropColumn(this.tableName, "establishment_id")

        await queryRunner.changeColumn(
            this.tableName,
            "user_id",
            new TableColumn({
                name: "user_id",
                type: "uuid",
                isNullable: false
            })
        )
    }
}
