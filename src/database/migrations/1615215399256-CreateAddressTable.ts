import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAddressTable1615215399256 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table ({
        name: 'address', //Cria a tabela users
        columns: [{
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'address',
          type: 'varchar',
        },
        {
          name: 'number',
          type: 'varchar'
        },
        {
          name: 'complement',
          type: 'varchar',
        },
        {
          name: 'cep',
          type: 'varchar',
        },
        {
          name: 'city',
          type: 'varchar',
        },
        {
          name: 'estate',
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
    await queryRunner.dropTable('address') //Deleta a tabela de endereços
  }

}
