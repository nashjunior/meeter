import * as Yup from 'yup';

export const createMeetingSchema = Yup.object().shape({
  name: Yup.string().required().max(128),
  lat: Yup.number().required().min(-90).max(90),
  long: Yup.number().required().min(-180).max(180),
  start: Yup.date().required(),
  end: Yup.date().required(),
  description: Yup.string().notRequired(),
});
