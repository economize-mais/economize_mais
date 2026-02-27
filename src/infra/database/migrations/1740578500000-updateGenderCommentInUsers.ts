import { MigrationInterface, QueryRunner } from "typeorm"

export class UpdateGenderCommentInUsers1740578500000
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            COMMENT ON COLUMN users.gender IS 'M = Male, F = Female, O = Other'
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            COMMENT ON COLUMN users.gender IS 'M = Male, F = Female'
        `)
    }
}
