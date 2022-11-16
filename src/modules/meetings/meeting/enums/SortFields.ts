export const SortFieldsListMeetings = {
  NAME: 'name',
  CREATED_AT: 'created_At',
} as const;

export type ISortFieldsListMeetings = keyof typeof SortFieldsListMeetings;
export type ISortFieldsListMeetingsValues =
  typeof SortFieldsListMeetings[ISortFieldsListMeetings];

export const SortFieldsListTodos = {
  TODO: 'todo',
  CREATED_AT: 'created_At',
} as const;

export type ISortFieldsListTodos = keyof typeof SortFieldsListTodos;
export type ISortFieldsListTodosValues =
  typeof SortFieldsListTodos[ISortFieldsListTodos];
