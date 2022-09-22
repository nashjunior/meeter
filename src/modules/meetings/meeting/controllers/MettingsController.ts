import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { IQueryFieldsListMeetings } from '../enums';
import { IListMeetingRequest } from '../interfaces/requests';
import { ListMeetingsService } from '../useCases';

export class MeetingsController {
  async list(
    {
      params: { query, page, lat, long, ...rest },
    }: FastifyRequest<{ Params: IListMeetingRequest }>,
    response: FastifyReply,
  ) {
    const queryFields: IQueryFieldsListMeetings[] = [];

    if (rest.query_fields) {
      if (Array.isArray(rest.query_fields))
        queryFields.push(...rest.query_fields);
      else queryFields.push(rest.query_fields);
    }

    if (rest['query_fields[]']) {
      if (Array.isArray(rest['query_fields[]']))
        queryFields.push(...rest['query_fields[]']);
      else queryFields.push(rest['query_fields[]']);
    }

    const listMeetingsService = container.resolve(ListMeetingsService);

    const meetings = await listMeetingsService.execute({
      page,
      perPage: rest.per_page,
      lat,
      long,

      queryFields,
      query,

      ordersSort: [],
    });

    return response.send(meetings);
  }
}
