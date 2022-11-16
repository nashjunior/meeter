export const QueryFieldsListMettings = {
  NAME: 'name',
} as const;

export type IQueryFieldsListMeetings = keyof typeof QueryFieldsListMettings;
export type IQueryFieldsListMeetingsValues =
  typeof QueryFieldsListMettings[IQueryFieldsListMeetings];

export const QueryFieldsListTodo = {
  TODO: 'todo',
};

export type IQueryFieldsListTodo = keyof typeof QueryFieldsListMettings;
export type IQueryFieldsListTodoValues =
  typeof QueryFieldsListMettings[IQueryFieldsListTodo];
