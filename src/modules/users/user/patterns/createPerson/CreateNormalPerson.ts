import { inject, injectable } from 'tsyringe';
import { Person } from '../../entities';
import { IUserRepository } from '../../repositories';
import { CreatePerson } from './AbstractCreatePersons';
import { IHandle } from './interfaces';

@injectable()
export class CreateNormalPerson extends CreatePerson {
  constructor(
    @inject('UserTypeormRepository')
    public userTypeormRepository: IUserRepository,
  ) {
    super();
  }

  public async handle({
    user_type,
    ...rest
  }: IHandle): Promise<Person | undefined> {
    console.log(rest);

    if (user_type === 0) {
      return this.userTypeormRepository.createOne(rest);
    }

    return super.handle({ user_type, ...rest });
  }
}
