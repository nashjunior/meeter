import { environment } from '@config/enviroment';
import { DataSource } from 'typeorm';
import * as usersEntities from '@modules/users/user/entities';
import * as meetingsEntities from '@modules/meetings/meeting/entities';

export const MeeterDataSource = new DataSource({
  type: 'postgres',
  url: environment.parsed?.DATABASE_URL,
  migrations: [environment.parsed?.PATH_MIGRATIONS as string],
  entities: [
    ...Object.values(usersEntities),
    ...Object.values(meetingsEntities),
  ],
});
