import { Todo } from '../../entities';
import { ICreateTodoDTO } from '../../interfaces';
import { IFindTodos } from './IFindTodosType';

export interface ITodosRepository {
  find(options: IFindTodos): Promise<[Todo[], number]>;
  findByMeeting(
    options: IFindTodos & { idMeeting: number },
  ): Promise<[Todo[], number]>;

  createMany(
    todos: ICreateTodoDTO[],
    idMeeting: number,
    idPerson: number,
    createdBy: string,
  ): Promise<Todo[]>;
}
