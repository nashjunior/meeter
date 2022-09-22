export type IMeetingResponse = {
  id: string;
  lat: number;
  long: number;
  name: string;
  start: Date;
  end: Date;
  description?: string;
  created_at: Date;
  updated_at?: Date;
};
