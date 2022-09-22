import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableMeetings1663446774389 implements MigrationInterface {
  private table = new Table({
    name: 'meetings',
    columns: [
      { name: 'uuid', type: 'char', length: '36', isUnique: true },
      { name: 'id_meeting', type: 'int', isPrimary: true, isGenerated: true },
      { name: 'lat', type: 'numeric' },
      { name: 'long', type: 'numeric' },
      { name: 'name', type: 'varchar', length: '128' },
      { name: 'start', type: 'timestamp', default: 'now()' },
      { name: 'end', type: 'timestamp', default: 'now()' },
      { name: 'description', type: 'varchar', isNullable: true },

      { name: 'created_at', type: 'timestamp', default: 'now()' },
      { name: 'created_by', type: 'varchar' },
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
