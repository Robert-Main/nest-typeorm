import { Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class PublicItems1760522385228 implements MigrationInterface {
  private readonly logger = new Logger(PublicItems1760522385228.name);

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('up');
    // Fix typo: "itme" should be "item"
    await queryRunner.query(`UPDATE item SET public = 1 `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.logger.log('down');
    // Add rollback logic if needed
    await queryRunner.query(`UPDATE item SET public = NULL WHERE public = 1`);
  }
}
