import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
    TableIndex
} from "typeorm"

export class CreateEstablishmentTypeLinksTable1762304397917
    implements MigrationInterface
{
    private tableName = "establishment_type_links"

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
                        name: "establishment_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "type_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            }),
            true
        )

        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                columnNames: ["establishment_id"],
                referencedTableName: "establishments",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        )

        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                columnNames: ["type_id"],
                referencedTableName: "establishment_types",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        )

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_establishment_type_links_establishment",
                columnNames: ["establishment_id"]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(
            this.tableName,
            "IDX_establishment_type_links_establishment"
        )

        const table = await queryRunner.getTable(this.tableName)

        const fkEstablishment = table.foreignKeys.find(
            (fk) => fk.name === "FK_establishment_type_links_establishment"
        )
        const fkType = table.foreignKeys.find(
            (fk) => fk.name === "FK_establishment_type_links_type"
        )

        if (fkType) await queryRunner.dropForeignKey(this.tableName, fkType)

        if (fkEstablishment)
            await queryRunner.dropForeignKey(this.tableName, fkEstablishment)

        await queryRunner.dropTable(this.tableName)
    }
}
