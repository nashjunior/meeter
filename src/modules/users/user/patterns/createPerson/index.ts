import { container } from 'tsyringe';
import { CreateClientPerson } from './CreateClientPerson';
import { CreateNormalPerson } from './CreateNormalPerson';
export * from './interfaces';

const normalPerson = container.resolve(CreateNormalPerson);
const clientPerson = container.resolve(CreateClientPerson);

normalPerson.setNext(clientPerson);

container.register('CreatePersonChainService', { useValue: normalPerson });
