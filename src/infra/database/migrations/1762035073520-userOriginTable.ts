import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey
} from "typeorm"

export class UserOriginTable1762035073520 implements MigrationInterface {
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
            })
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
            })
        )

        await queryRunner.createForeignKey(
            this.userOriginTable,
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.userTable,
                onDelete: "CASCADE"
            })
        )

        await queryRunner.createForeignKey(
            this.userOriginTable,
            new TableForeignKey({
                columnNames: ["origin_id"],
                referencedColumnNames: ["id"],
                referencedTableName: this.originTable,
                onDelete: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.userOriginTable)
        await queryRunner.dropTable(this.originTable)
    }
}
