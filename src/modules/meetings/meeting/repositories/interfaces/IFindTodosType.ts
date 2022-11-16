import {
  IQueryFieldsListTodoValues,
  ISortFieldsListTodosValues,
} from '../../enums';

export type IFindTodos = {
  deleted?: boolean;
  query?: {
    fields: IQueryFieldsListTodoValues[];
    value: string;
  };
  order?: {
    fields: ISortFieldsListTodosValues[];
    type: ('ASC' | 'DESC')[];
  };
  page?: number;
  perPage?: number;
};
