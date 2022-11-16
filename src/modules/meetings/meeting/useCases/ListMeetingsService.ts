import { inject, injectable } from 'tsyringe';
import { QueryFieldsListMettings } from '../enums';
import { IListMeetingsDTO } from '../interfaces';
import { manyModelMeetingsToAPI } from '../mappers';
import { IMeetingsRepository } from '../repositories';
import { findMeetingsSchema } from '../schemas';

@injectable()
export class ListMeetingsService {
  constructor(
    @inject('MeetingsMeetingTypeormRepository')
    private meetingsRepository: IMeetingsRepository,
  ) {}

  async execute(dto: IListMeetingsDTO) {
    await findMeetingsSchema.validate(dto, { abortEarly: false });

    const { page, perPage, queryFields, query, ...rest } = dto;

    const hasPagination = !!page && !!perPage;
    const queryFilter = query
      ? {
          value: query,
          fields: queryFields.map(field => QueryFieldsListMettings[field]),
        }
      : undefined;

    const [meetings, total] = await this.meetingsRepository.find({
      page,
      perPage,
      query: queryFilter,
      ...rest,
    });

    console.log(rest);

    return {
      items: manyModelMeetingsToAPI(meetings),
      total,
      total_pages: hasPagination ? Math.ceil(total / (perPage as number)) : 1,
    };
  }
}
