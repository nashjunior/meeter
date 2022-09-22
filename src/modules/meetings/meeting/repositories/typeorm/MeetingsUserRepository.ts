import { MeeterDataSource } from '@database/sources';
import { Meeting } from '../../entities';
import { IMeetingsRepository } from '../interfaces';

export const MeetingsMeetingTypeormRepository = MeeterDataSource.getRepository(
  Meeting,
).extend<IMeetingsRepository>({
  find({ deleted, page, perPage, lat, long }) {
    const hasPagination = page && perPage;
    const builder = this.createQueryBuilder('meetings');

    const hasDeletion = deleted === true || deleted === false;
    const queryDeleted = 'meetings.deleted = :deleted';

    let hasQuery = hasDeletion;

    if (lat) {
      const queryString = 'meetings.lat <= :lat';

      if (hasQuery) builder.andWhere(queryString, { lat });
      else builder.where(queryString, { lat });

      hasQuery = true;
    }

    if (long) {
      const queryString = 'meetings.long <= :long';

      if (hasQuery) builder.andWhere(queryString, { long });
      else builder.where(queryString, { long });

      hasQuery = true;
    }

    if (hasDeletion) {
      builder.where(queryDeleted, { deleted });
    }

    if (hasPagination) {
      builder.take(page * perPage - perPage);
      builder.skip(perPage);
    }

    return builder.getManyAndCount();
  },
});
