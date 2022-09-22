import { MeeterDataSource } from '@database/sources';
import { v4 as uuidV4 } from 'uuid';
import { QueryRunner } from 'typeorm';
import { IClientRepositoty } from '../interfaces/IClientRepositoty';
import { ICreateClientDTO } from '../../interfaces';
import { Client } from '../../entities';

export const ClientTypeormRepository = MeeterDataSource.getRepository(
  Client,
).extend<IClientRepositoty>({
  async startTypeormTransaction(source) {
    const queryRunner = source.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    return queryRunner;
  },

  async createOne(dto: ICreateClientDTO, queryRunner?: QueryRunner) {
    const instance = this.create({
      ...dto,
      id: uuidV4(),
    });

    return queryRunner
      ? queryRunner.manager.save(instance)
      : this.save(instance);
  },
});
