import { Person } from '../entities';
import { IPersonResponse } from '../interfaces';
import { modelClientToApi } from './Client';

export const modelPersonToApi = ({
  id,
  cpfCnpj,
  createdAt,
  name,
  updatedAt,
  client,
}: Person): IPersonResponse => ({
  id,
  name,
  cpf_cnpj: cpfCnpj,
  created_at: createdAt,
  updated_at: updatedAt,
  client: client ? modelClientToApi(client) : undefined,
});

export const manyModelPersonsToAPI = (persons: Person[]): IPersonResponse[] =>
  persons.map(client => modelPersonToApi(client));
