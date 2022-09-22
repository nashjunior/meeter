import { inject, injectable } from 'tsyringe';
import { ICreateMeetingDTO } from '../interfaces';
import { modelMeetingToApi } from '../mappers';
import { IMeetingsUserRepository } from '../repositories';
import { createMeetingSchema } from '../schemas';

@injectable()
export class CreateMeetingService {
  constructor(
    @inject('MeetingsUserTypeormRepository')
    private meetingsUserRepository: IMeetingsUserRepository,
  ) {}

  async execute(dto: ICreateMeetingDTO) {
    await createMeetingSchema.validate(dto, { abortEarly: false });

    const meeting = await this.meetingsUserRepository.createOne(dto);

    return modelMeetingToApi(meeting);
  }
}
