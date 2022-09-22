export type ICreateMeetingRequest = {
  name: string;
  lat: number;
  long: number;
  description?: string;
  start: Date;
  end: Date;
};
