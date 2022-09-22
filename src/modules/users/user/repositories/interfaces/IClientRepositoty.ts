import { DataSource, QueryRunner } from 'typeorm';
import { ICreateClientDTO } from '../../interfaces';
import { Client } from '../../entities';

export interface IClientRepositoty {
  createOne(dto: ICreateClientDTO, queryRunner?: QueryRunner): Promise<Client>;

  startTypeormTransaction(source: DataSource): Promise<QueryRunner>;
}
