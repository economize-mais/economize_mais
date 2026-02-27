import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class MakePhoneNullableInUsers1740578400000
    implements MigrationInterface
{
    private tableName = "users"

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Remove default value and make phone nullable
        await queryRunner.changeColumn(
            this.tableName,
            "phone",
            new TableColumn({
                name: "phone",
                type: "varchar",
                length: "20",
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert back to not nullable with default value
        await queryRunner.changeColumn(
            this.tableName,
            "phone",
            new TableColumn({
                name: "phone",
                type: "varchar",
                length: "20",
                isNullable: false,
                default: "'(35)99999-9999'"
            })
        )
    }
}
