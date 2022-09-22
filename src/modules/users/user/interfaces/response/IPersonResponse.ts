import { IClientResponse } from './IClientResponse';

export type IPersonResponse = {
  id: string;
  name: string;
  cpf_cnpj: string;
  created_at: Date;
  updated_at?: Date;
  client?: IClientResponse;
};
