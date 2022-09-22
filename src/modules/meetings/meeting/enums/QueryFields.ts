export const QueryFieldsListMettings = {
  NAME: 'name',
} as const;

export type IQueryFieldsListMeetings = keyof typeof QueryFieldsListMettings;
export type IQueryFieldsListMeetingsValues =
  typeof QueryFieldsListMettings[IQueryFieldsListMeetings];
