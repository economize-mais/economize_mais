import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from "typeorm"

export class CreateOriginTable1762212800757 implements MigrationInterface {
    private userOriginTable: string = "user_origin"
    private originTable: string = "origin"
    private userTable: string = "users"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: this.originTable,
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true
                    },
                    {
                        name: "status",
                        type: "boolean",
                        isNullable: false,
                        default: true
                    },
                    {
                        name: "description",
                        type: "varchar",
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
                name: this.userOriginTable,
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "origin_id",
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
            this.userOriginTable,
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.userTable,
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        )

        await queryRunner.createForeignKey(
            this.userOriginTable,
            new TableForeignKey({
                columnNames: ["origin_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.originTable,
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const userOriginTable = await queryRunner.getTable(this.userOriginTable)

        if (userOriginTable) {
            const userFk = userOriginTable.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("user_id") !== -1
            )
            const originFk = userOriginTable.foreignKeys.find(
                (fk) => fk.columnNames.indexOf("origin_id") !== -1
            )

            if (userFk)
                await queryRunner.dropForeignKey(this.userOriginTable, userFk)

            if (originFk)
                await queryRunner.dropForeignKey(this.userOriginTable, originFk)
        }

        await queryRunner.dropTable(this.userOriginTable)
        await queryRunner.dropTable(this.originTable)
    }
}
