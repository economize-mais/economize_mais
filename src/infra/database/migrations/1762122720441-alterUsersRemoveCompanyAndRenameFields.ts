import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AlterUsersRemoveCompanyAndRenameFields1762122720441
    implements MigrationInterface
{
    private tableName = "users"

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn(this.tableName, "cpf_cnpj", "cpf")

        await queryRunner.renameColumn(this.tableName, "user_type", "type")

        await queryRunner.dropColumn(this.tableName, "company_name")
        await queryRunner.dropColumn(this.tableName, "trade_name")
        await queryRunner.dropColumn(this.tableName, "logo_url")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameColumn(this.tableName, "cpf", "cpf_cnpj")
        await queryRunner.renameColumn(this.tableName, "type", "user_type")

        await queryRunner.addColumns(this.tableName, [
            new TableColumn({
                name: "company_name",
                type: "varchar",
                isNullable: true,
                comment: "Legal name of the company"
            }),
            new TableColumn({
                name: "trade_name",
                type: "varchar",
                isNullable: true,
                comment: "Trading name of the company"
            }),
            new TableColumn({
                name: "logo_url",
                type: "varchar",
                isNullable: true,
                comment: "URL of the company's logo"
            })
        ])
    }
}
