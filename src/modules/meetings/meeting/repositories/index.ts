import { container } from 'tsyringe';
import { IMeetingsRepository, ITodosRepository } from './interfaces';
import {
  MeetingsMeetingTypeormRepository,
  TodosTypeormRepository,
} from './typeorm';

export * from './interfaces';

container.register<IMeetingsRepository>('MeetingsMeetingTypeormRepository', {
  useValue: MeetingsMeetingTypeormRepository,
});

container.register<ITodosRepository>('TodosTypeormRepository', {
  useValue: TodosTypeormRepository,
});
