import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Init1703056660031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            unsigned: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
            length: '50',
          },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'url',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            unsigned: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'expired_at',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'url',
            type: 'varchar',
            isNullable: false,
            length: '200',
          },
          {
            name: 'shorten_url',
            type: 'varchar',
            isNullable: false,
            length: '200',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
    await queryRunner.dropTable('url');
  }
}
