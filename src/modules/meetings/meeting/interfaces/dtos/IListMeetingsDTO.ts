import {
  IQueryFieldsListMeetings,
  ISortFieldsListMeetingsValues,
} from '../../enums';

export interface IListMeetingsDTO {
  deleted?: boolean;
  lat?: number;
  long?: number;

  queryFields: IQueryFieldsListMeetings[];
  query?: string;

  ordersSort: ('ASC' | 'DESC')[];
  orders?: ISortFieldsListMeetingsValues[];

  page?: number;
  perPage?: number;
}
