import { Todo } from '../entities';
import { ITodoResponse } from '../interfaces';

export const modelTodoToApi = ({
  id,
  todo,
  createdAt,
  updatedAt,
}: Todo): ITodoResponse => ({
  id,
  todo,
  created_at: createdAt,
  updated_at: updatedAt,
});

export const manyModelTodosToAPI = (todos: Todo[]): ITodoResponse[] =>
  todos.map(Meeting => modelTodoToApi(Meeting));
