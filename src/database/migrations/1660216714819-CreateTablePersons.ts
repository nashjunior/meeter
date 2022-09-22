import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTablePersons1660216714819 implements MigrationInterface {
  private table = new Table({
    name: 'persons',
    columns: [
      {
        name: 'id_person',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
      },
      { name: 'uuid', type: 'char', length: '36', isUnique: true },

      { name: 'name', type: 'varchar', length: '256' },
      { name: 'cpf_cnpj', type: 'varchar', length: '20' },
      { name: 'created_at', type: 'timestamp', default: 'now()' },
      { name: 'updated_at', type: 'timestamp', isNullable: true },
    ],
  });
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
