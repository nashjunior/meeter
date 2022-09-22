import { Meeting } from '../../entities';
import { ICreateMeetingDTO } from '../../interfaces';

export interface IMeetingsUserRepository {
  createOne(dto: ICreateMeetingDTO): Promise<Meeting>;
}
