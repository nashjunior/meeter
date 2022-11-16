import { inject, injectable } from 'tsyringe';
import { manyModelTodosToAPI } from '../mappers';
import { IMeetingsRepository, ITodosRepository } from '../repositories';

type IRequest = {
  idMeeting: string;
  todos: string[];
  idPerson: number;
  createdBy: string;
};

@injectable()
export class CreateTodoService {
  constructor(
    @inject('MeetingsMeetingTypeormRepository')
    private meetingsRepository: IMeetingsRepository,

    @inject('TodosTypeormRepository') private todosRepository: ITodosRepository,
  ) {}

  async execute({ createdBy, idPerson, idMeeting, todos }: IRequest) {
    const { idMeeting: id } = await this.meetingsRepository.findByUUID(
      idMeeting,
    );

    const todosInstance = todos.map(todo => ({ todo }));
    const todosCreated = await this.todosRepository.createMany(
      todosInstance,
      id,
      idPerson,
      createdBy,
    );

    return manyModelTodosToAPI(todosCreated);
  }
}
