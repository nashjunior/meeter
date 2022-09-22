import { Person } from '../../entities';
import { IHandle } from './interfaces';
import { ICreateUserHandler } from './interfaces/ICreateUserHandler';

export abstract class CreatePerson implements ICreateUserHandler {
  private nextHandler: ICreateUserHandler;

  public setNext(handler: ICreateUserHandler): ICreateUserHandler {
    this.nextHandler = handler;

    return handler;
  }

  public async handle(request: IHandle): Promise<Person | undefined> {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }

    return undefined;
  }
}
