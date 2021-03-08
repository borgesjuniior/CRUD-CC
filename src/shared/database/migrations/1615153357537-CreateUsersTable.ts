import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1611106710110 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'); //Habilita a extensão para gerar o id automático no postgres

    await queryRunner.createTable(
      new Table ({
        name: 'users', //Cria a tabela users
        columns: [{
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'phone',
          type: 'varchar'
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'age',
          type: 'int',
        },
        {
          name: 'weight',
          type: 'float',
        },
        {
          name: 'ethnicity',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users'); //exclui a tabela users
    await queryRunner.query('DROP EXTENSION "uuid-ossp"'); //Desabilita uuid automático
  }

}
