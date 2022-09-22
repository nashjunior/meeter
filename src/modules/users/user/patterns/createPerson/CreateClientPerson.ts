import { autoInjectable, inject } from 'tsyringe';
import { CreatePerson } from './AbstractCreatePersons';
import { Person } from '../../entities';
import { MeeterDataSource } from '@database/sources';
import { IClientRepositoty, IUserRepository } from '../../repositories';
import { IHandle } from './interfaces';

@autoInjectable()
export class CreateClientPerson extends CreatePerson {
  constructor(
    @inject('ClientTypeormRepository')
    public clientRepositoty: IClientRepositoty,

    @inject('UserTypeormRepository')
    public userTypeormRepository: IUserRepository,
  ) {
    super();
  }

  public async handle({
    user_type,
    ...rest
  }: IHandle): Promise<Person | undefined> {
    if (user_type !== 1) {
      return super.handle({ user_type, ...rest });
    }

    const queryRunner =
      await this.userTypeormRepository.startTypeormTransaction(
        MeeterDataSource,
      );

    try {
      const person = await this.userTypeormRepository.createOne(
        rest,
        queryRunner,
      );

      const client = await this.clientRepositoty.createOne(
        { idPerson: person.idPerson, createdBy: rest.createdBy },
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return {
        ...person,
        client,
      };
    } catch (error) {
      console.error('client');

      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
