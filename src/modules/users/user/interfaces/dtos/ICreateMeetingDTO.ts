export type ICreateMeetingDTO = {
  name: string;
  lat: number;
  long: number;
  description?: string;
  start: Date;
  end: Date;
  createdBy: string;
};
