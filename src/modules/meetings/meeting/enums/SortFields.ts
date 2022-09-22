export const SortFieldsListMeetings = {
  NAME: 'name',
  CREATED_AT: 'created_At',
} as const;

export type ISortFieldsListMeetings = keyof typeof SortFieldsListMeetings;
export type ISortFieldsListMeetingsValues =
  typeof SortFieldsListMeetings[ISortFieldsListMeetings];
