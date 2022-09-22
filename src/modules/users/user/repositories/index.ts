import { container } from 'tsyringe';
import {
  IClientRepositoty,
  IMeetingsUserRepository,
  IUserRepository,
} from './interfaces';
import { ClientTypeormRepository, UserTypeormRepository } from './typeorm';
import { MeetingsUserTypeormRepository } from './typeorm';

export * from './interfaces';

container.register<IUserRepository>('UserTypeormRepository', {
  useValue: UserTypeormRepository,
});

container.register<IClientRepositoty>('ClientTypeormRepository', {
  useValue: ClientTypeormRepository,
});

container.register<IMeetingsUserRepository>('MeetingsUserTypeormRepository', {
  useValue: MeetingsUserTypeormRepository,
});
