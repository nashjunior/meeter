import { Meeting } from '../../entities';
import { IFindMeetings } from './IFindMeetingsType';

export interface IMeetingsRepository {
  find(options: IFindMeetings): Promise<[Meeting[], number]>;
}
