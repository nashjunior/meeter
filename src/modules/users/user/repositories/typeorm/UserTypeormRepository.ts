import { MeeterDataSource } from '@database/sources';

import { IUserRepository } from '../';
import { v4 as uuidV4 } from 'uuid';
import { QueryRunner } from 'typeorm';
import { Person } from '../../entities';
import { ICreateUserDTO } from '../../interfaces';

export const UserTypeormRepository = MeeterDataSource.getRepository(
  Person,
).extend<IUserRepository>({
  async startTypeormTransaction(source) {
    const queryRunner = source.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    return queryRunner;
  },

  async createOne(dto: ICreateUserDTO, queryRunner?: QueryRunner) {
    const instance = this.create({
      ...dto,
      id: uuidV4(),
    });

    return queryRunner
      ? queryRunner.manager.save(instance)
      : this.save(instance);
  },
});
