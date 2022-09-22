import { DataSource, QueryRunner } from 'typeorm';
import { ICreateUserDTO } from '../../interfaces';
import { Person } from '../../entities';

export interface IUserRepository {
  createOne(dto: ICreateUserDTO, queryRunner?: QueryRunner): Promise<Person>;

  startTypeormTransaction(source: DataSource): Promise<QueryRunner>;
}
