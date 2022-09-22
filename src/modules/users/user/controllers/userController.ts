import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { ICreateUserRequest } from '../interfaces/requests';
import { CreateUserService } from '../useCases';

export class UserController {
  async create(
    request: FastifyRequest<{ Body: ICreateUserRequest }>,
    response: FastifyReply,
  ) {
    const { cpf_cnpj, name, type } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      cpfCnpj: cpf_cnpj,
      createdBy: 'aeuhae',
      type,
    });

    return response.status(201).send(user);
  }
}
