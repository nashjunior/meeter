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
      const queryString = 'meetings.lat between :lat1 AND :lat2 ';

      if (hasQuery)
        builder.andWhere(queryString, { lat1: lat[1], lat2: lat[0] });
      else builder.where(queryString, { lat1: lat[1], lat2: lat[0] });

      hasQuery = true;
    }

    if (long) {
      const queryString = 'meetings.long between :long1 AND :long2';

      if (hasQuery)
        builder.andWhere(queryString, { long1: long[0], long2: long[1] });
      else builder.where(queryString, { long1: long[0], long2: long[1] });

      hasQuery = true;
    }

    if (hasDeletion) builder.where(queryDeleted, { deleted });

    if (hasPagination) {
      builder.take(page * perPage - perPage);
      builder.skip(perPage);
    }

    return builder.getManyAndCount();
  },

  findByUUID(id) {
    return this.findOneOrFail({ where: { id } });
  },
});
