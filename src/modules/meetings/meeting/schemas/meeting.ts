import * as Yup from 'yup';
import {
  IQueryFieldsListMeetings,
  ISortFieldsListMeetings,
  QueryFieldsListMettings,
  SortFieldsListMeetings,
} from '../enums';

export const editMeetingSchema = Yup.object().shape({
  name: Yup.string().required().max(128),
  lat: Yup.number().required().min(-90).max(90),
  long: Yup.number().required().min(-180).max(180),
  start: Yup.date().required(),
  end: Yup.date().required(),
  description: Yup.string().notRequired(),
});

export const findMeetingsSchema = Yup.object().shape(
  {
    query: Yup.string().notRequired(),
    queryFields: Yup.array().of(
      Yup.mixed<IQueryFieldsListMeetings>().oneOf(
        Object.keys(QueryFieldsListMettings) as any,
      ),
    ),

    sortedFieldsType: Yup.array()
      .of(
        Yup.string()
          .oneOf(['asc', 'desc', 'ASC', 'DESC'])
          .uppercase()
          .required(),
      )
      .test(
        'isSameSize',
        'fields to sort length and types of sort length does not match',
        function (fields) {
          const {
            parent: { sortedFieldsType },
          } = this;

          return sortedFieldsType?.length === fields?.length;
        },
      ),
    sortedFields: Yup.array()
      .of(
        Yup.mixed<ISortFieldsListMeetings>()
          .oneOf(Object.keys(SortFieldsListMeetings) as any)
          .required(),
      )
      .test(
        'isSameSize',
        'types sort length and fields to sort length  does not match',
        function (fields) {
          const {
            parent: { sortedFields },
          } = this;

          return sortedFields?.length === fields?.length;
        },
      ),

    lat: Yup.number().notRequired().typeError('Invalid format page'),
    long: Yup.number().notRequired().typeError('Invalid format page'),
    page: Yup.number().notRequired().typeError('Invalid format page'),
    perPage: Yup.number().notRequired().typeError('Invalid format perPage'),
  },
  ['sortedFields', 'sortedFieldsType'] as any,
);
