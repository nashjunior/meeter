import { MeeterDataSource } from '@database/sources';
import { Meeting } from '../../entities';
import { IMeetingsUserRepository } from '../interfaces';
import { v4 as uuidV4 } from 'uuid';

export const MeetingsUserTypeormRepository = MeeterDataSource.getRepository(
  Meeting,
).extend<IMeetingsUserRepository>({
  createOne(dto) {
    const instance = this.create({ id: uuidV4(), ...dto });

    return this.save(instance);
  },
});
