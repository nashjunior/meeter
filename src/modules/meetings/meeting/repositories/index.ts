import { container } from 'tsyringe';
import { IMeetingsUserRepository } from './interfaces';
import { MeetingsMeetingTypeormRepository } from './typeorm';

export * from './interfaces';

container.register<IMeetingsUserRepository>(
  'MeetingsMeetingTypeormRepository',
  { useValue: MeetingsMeetingTypeormRepository },
);
