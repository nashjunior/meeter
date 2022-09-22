import { inject, injectable } from 'tsyringe';
import { ICreateUserDTO } from '../interfaces';
import { modelPersonToApi } from '../mappers';
import { ICreateUserHandler } from '../patterns';
import { createUserSchema } from '../schemas';

@injectable()
export class CreateUserService {
  constructor(
    @inject('CreatePersonChainService')
    private personservice: ICreateUserHandler,
  ) {}

  async execute({ type, ...user }: ICreateUserDTO & { type: 0 | 1 }) {
    await createUserSchema.validate({ ...user, type }, { abortEarly: false });

    const userCreated = await this.personservice.handle({
      ...user,
      user_type: type,
    });

    if (!userCreated) throw new Error('Erro na requisicao');

    return modelPersonToApi(userCreated);
  }
}
