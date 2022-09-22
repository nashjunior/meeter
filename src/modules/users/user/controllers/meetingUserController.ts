import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { ICreateMeetingRequest } from '../interfaces/requests';
import { CreateMeetingService } from '../useCases';

export class MeetingUserController {
  async create(
    {
      body: { end, lat, long, name, start, description },
    }: FastifyRequest<{ Body: ICreateMeetingRequest }>,
    response: FastifyReply,
  ) {
    const createMeetingService = container.resolve(CreateMeetingService);

    const user = await createMeetingService.execute({
      end,
      lat,
      long,
      name,
      start,
      description,
      createdBy: '1',
    });

    return response.status(201).send(user);
  }
}
