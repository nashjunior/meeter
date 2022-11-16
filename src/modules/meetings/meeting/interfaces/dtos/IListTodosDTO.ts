import { IQueryFieldsListTodo, IQueryFieldsListTodoValues } from '../../enums';

export interface IListTodosDTO {
  deleted?: boolean;

  queryFields: IQueryFieldsListTodo[];
  query?: string;

  ordersSort: ('ASC' | 'DESC')[];
  orders?: IQueryFieldsListTodoValues[];

  page?: number;
  perPage?: number;
}
