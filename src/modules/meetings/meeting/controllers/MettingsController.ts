import { FastifyReply } from 'fastify';
import { FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { IQueryFieldsListMeetings } from '../enums';
import { IListMeetingRequest, IListTodoRequest } from '../interfaces/requests';
import { ListMeetingsService } from '../useCases';
import { ListTodoByMettingService } from '../useCases/ListTodoByMettingService';

export class MeetingsController {
  async list(
    {
      query: { query, page, ...rest },
    }: FastifyRequest<{ Querystring: IListMeetingRequest }>,
    response: FastifyReply,
  ) {
    const queryFields: IQueryFieldsListMeetings[] = [];
    let lat: [number, number] | undefined = [];
    let long: [number, number] | undefined = [];

    if (rest['lat[]']) lat?.push(...rest['lat[]']);
    else if (rest.lat) lat?.push(...rest.lat);
    else lat = undefined;

    if (rest['long[]']) long?.push(...rest['long[]']);
    else if (rest.long) long?.push(...rest.long);
    else long = undefined;

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

  async listTodos(
    {
      query: { query, page, ...rest },
      params: { id },
    }: FastifyRequest<{
      Querystring: IListTodoRequest;
      Params: { id: string };
    }>,
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

    const listMeetingsService = container.resolve(ListTodoByMettingService);

    const meetings = await listMeetingsService.execute({
      page,
      perPage: rest.per_page,
      idMeeting: id,
      queryFields,
      query,

      ordersSort: [],
    });

    return response.send(meetings);
  }
}
