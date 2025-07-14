import { 
    MigrationInterface, 
    QueryRunner, 
    TableColumn 
} from "typeorm"

export class CreateColumnPhoneInUsers1752454519814 implements MigrationInterface {

    private tableName: string = "users"

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            this.tableName,
            new TableColumn(
                {
                    name: "phone",
                    type: "varchar",
                    length: "20",
                    isNullable: false,
                    default: "'(35)99999-9999'"
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(this.tableName, "phone")
    }
}
