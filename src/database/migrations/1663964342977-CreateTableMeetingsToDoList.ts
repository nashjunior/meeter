import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableMeetingsToDoList1663964342977
  implements MigrationInterface
{
  private table = new Table({
    name: 'meetings_to_do',
    columns: [
      { name: 'uuid', type: 'char', length: '36', isUnique: true },
      {
        name: 'id_meeting_to_do',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
      },
      { name: 'id_meeting', type: 'int' },
      { name: 'id_person', type: 'int' },
      { name: 'todo', type: 'varchar' },

      { name: 'created_at', type: 'timestamp', default: 'now()' },
      { name: 'created_by', type: 'varchar' },
      { name: 'updated_at', type: 'timestamp', isNullable: true },
    ],
    foreignKeys: [
      {
        name: 'FK_MEETING_TODO',
        referencedSchema: 'public',
        referencedTableName: 'meetings',
        referencedColumnNames: ['id_meeting'],
        columnNames: ['id_meeting'],
        onUpdate: 'CASCADE',
      },
      {
        name: 'FK_PERSON_TODO',
        referencedSchema: 'public',
        referencedTableName: 'persons',
        referencedColumnNames: ['id_person'],
        columnNames: ['id_person'],
        onUpdate: 'CASCADE',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
