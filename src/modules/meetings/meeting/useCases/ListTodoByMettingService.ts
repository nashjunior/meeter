import { inject, injectable } from 'tsyringe';
import { IQueryFieldsListTodoValues, QueryFieldsListTodo } from '../enums';
import { IListTodosDTO } from '../interfaces';
import { manyModelTodosToAPI } from '../mappers';
import { IMeetingsRepository, ITodosRepository } from '../repositories';
import { findTodosSchema } from '../schemas';

@injectable()
export class ListTodoByMettingService {
  constructor(
    @inject('TodosTypeormRepository') private todosRepository: ITodosRepository,
    @inject('MeetingsMeetingTypeormRepository')
    private meetingsRepository: IMeetingsRepository,
  ) {}

  async execute(dto: IListTodosDTO & { idMeeting: string }) {
    await findTodosSchema.validate(dto, { abortEarly: false });

    const { page, perPage, queryFields, query, idMeeting, ...rest } = dto;
    const meeting = await this.meetingsRepository.findByUUID(idMeeting);

    const hasPagination = !!page && !!perPage;
    const queryFilter = query
      ? {
          value: query,
          fields: queryFields.map(
            field => QueryFieldsListTodo[field] as IQueryFieldsListTodoValues,
          ),
        }
      : undefined;

    const [meetings, total] = await this.todosRepository.findByMeeting({
      page,
      perPage,
      query: queryFilter,
      ...rest,
      idMeeting: meeting.idMeeting,
    });

    return {
      items: manyModelTodosToAPI(meetings),
      total,
      total_pages: hasPagination ? Math.ceil(total / (perPage as number)) : 1,
    };
  }
}
