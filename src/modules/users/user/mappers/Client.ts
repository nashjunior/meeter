import { Client } from '../entities';
import { IClientResponse } from '../interfaces';

export const modelClientToApi = ({
  id,
  createdAt,
  updatedAt,
}: Client): IClientResponse => ({
  id,
  created_at: createdAt,
  updated_at: updatedAt,
});

export const manyModelClientsToAPI = (clients: Client[]): IClientResponse[] =>
  clients.map(client => modelClientToApi(client));
