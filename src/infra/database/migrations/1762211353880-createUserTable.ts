import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm"

export class CreateUserTable1762211353880 implements MigrationInterface {
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
                        name: "type",
                        type: "varchar",
                        isNullable: false,
                        comment: "'USER' for normal users"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false
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
                        name: "cpf",
                        type: "varchar",
                        length: "14",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        length: "20",
                        isNullable: false,
                        default: "'(35)99999-9999'"
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

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_users_email",
                columnNames: ["email"]
            })
        )

        await queryRunner.createIndex(
            this.tableName,
            new TableIndex({
                name: "IDX_users_cpf",
                columnNames: ["cpf"]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(this.tableName, "IDX_users_cpf")
        await queryRunner.dropIndex(this.tableName, "IDX_users_email")

        await queryRunner.dropTable(this.tableName)
    }
}
