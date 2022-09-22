import { Meeting } from '../entities';
import { IMeetingResponse } from '../interfaces';

export const modelMeetingToApi = ({
  id,
  name,
  description,
  end,
  lat,
  long,
  start,
  createdAt,
  updatedAt,
}: Meeting): IMeetingResponse => ({
  id,
  name,
  description,
  lat,
  long,
  start,
  end,
  created_at: createdAt,
  updated_at: updatedAt,
});

export const manyModelMeetingsToAPI = (
  Meetings: Meeting[],
): IMeetingResponse[] => Meetings.map(Meeting => modelMeetingToApi(Meeting));
