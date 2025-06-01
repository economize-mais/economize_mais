import { 
    MigrationInterface, 
    QueryRunner, 
    Table,
    TableForeignKey
} from "typeorm"

export class UserAddressTable1748706554465 implements MigrationInterface {

    private tableName: string = "addresses"

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
                        name: "user_id",
                        type: "uuid",
                        isNullable: false
                    },
                    {
                        name: "street",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "number",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "neighborhood",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "city",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "state",
                        type: "varchar",
                        length: "2",
                        isNullable: false
                    },
                    {
                        name: "complement",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "zipcode",
                        type: "varchar",
                        length: "10",
                        isNullable: false
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
            })
        )

        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(this.tableName)
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf("user_id") !== -1)

        if (foreignKey)
            await queryRunner.dropForeignKey(this.tableName, foreignKey)

        await queryRunner.dropTable(this.tableName)
    }
}
