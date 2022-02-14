import {MigrationInterface, QueryRunner} from "typeorm";

export class user1644818363744 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" MODIFY("salt" char(350))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" MODIFY("salt" char(255))`);
    }

}
