import { 
    MigrationInterface, 
    QueryRunner, 
    Table
} from "typeorm"

export class UserTable1748201585832 implements MigrationInterface {

    private tableName: string = "users"

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)

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
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "full_name",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "cpf_cnpj",
                        type: "varchar",
                        length: "20",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "birth_date",
                        type: "date",
                        isNullable: true
                    },
                    {
                        name: "gender",
                        type: "char",
                        length: "1",
                        isNullable: true,
                        comment: "M = Male, F = Female"
                    },
                    {
                        name: "user_type",
                        type: "varchar",
                        isNullable: false,
                        comment: "'USER' for normal users, 'COMPANY' for supermarkets"
                    },
                    {
                        name: "company_name",
                        type: "varchar",
                        isNullable: true,
                        comment: "Legal name of the company"
                    },
                    {
                        name: "trade_name",
                        type: "varchar",
                        isNullable: true,
                        comment: "Trading name of the company"
                    },
                    {
                        name: "logo_url",
                        type: "varchar",
                        isNullable: true,
                        comment: "URL of the company's logo"
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName)
    }
}
