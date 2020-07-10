import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1593477233266
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4',
            isPrimary: true,
          },
          { name: 'provider', type: 'varchar', isNullable: false },
          { name: 'date', type: 'timestamp with time zone', isNullable: false },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
