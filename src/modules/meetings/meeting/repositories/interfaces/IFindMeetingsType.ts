import {
  IQueryFieldsListMeetingsValues,
  ISortFieldsListMeetingsValues,
} from '../../enums';

export type IFindMeetings = {
  deleted?: boolean;
  lat?: [number, number];
  long?: [number, number];
  query?: {
    fields: IQueryFieldsListMeetingsValues[];
    value: string;
  };
  order?: {
    fields: ISortFieldsListMeetingsValues[];
    type: ('ASC' | 'DESC')[];
  };
  page?: number;
  perPage?: number;
};
