import { IQueryFieldsListMeetings } from '../../enums';

export type IListMeetingRequest = {
  query?: string;
  'query_fields[]'?: IQueryFieldsListMeetings | IQueryFieldsListMeetings[];
  query_fields?: IQueryFieldsListMeetings | IQueryFieldsListMeetings[];
  page?: number;
  per_page: number;
  lat?: number;
  long?: number;
};
