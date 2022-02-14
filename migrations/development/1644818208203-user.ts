import {MigrationInterface, QueryRunner} from "typeorm";

export class user1644818208203 implements MigrationInterface {
    name = 'user1644818208203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" number GENERATED BY DEFAULT AS IDENTITY, "email" char(255) NOT NULL, "name" char(100) NOT NULL, "hash" char(512) NOT NULL, "salt" char(250) NOT NULL, "createdAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, "updatedAt" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
