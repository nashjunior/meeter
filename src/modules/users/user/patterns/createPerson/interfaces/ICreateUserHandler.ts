import { Person } from '@modules/users/user/entities';
import { IHandle } from './IHandle';

export interface ICreateUserHandler {
  setNext(handler: ICreateUserHandler): ICreateUserHandler;

  handle(request: IHandle): Promise<Person | undefined>;
}
