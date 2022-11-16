import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { ICreateTodoMeetingRequest } from '../interfaces/requests';
import { CreateTodoService } from '../useCases/CreateTodo';

export class TodosMeetingController {
  async create(
    {
      body: { todos },
      params: { id },
    }: FastifyRequest<{
      Body: ICreateTodoMeetingRequest;
      Params: { id: string };
    }>,
    response: FastifyReply,
  ) {
    const createMeetingService = container.resolve(CreateTodoService);

    const user = await createMeetingService.execute({
      todos,
      createdBy: '123',
      idMeeting: id,
      idPerson: 1,
    });

    return response.status(201).send(user);
  }
}
