import { MeeterDataSource } from '@database/sources';
import { Todo } from '../../entities';
import { ITodosRepository } from '../interfaces';
import { v4 as uuidV4 } from 'uuid';
import { Brackets } from 'typeorm';

export const TodosTypeormRepository = MeeterDataSource.getRepository(
  Todo,
).extend<ITodosRepository>({
  createMany(todos, idMeeting, idPerson, createdBy) {
    const todosInstance = this.create(
      todos.map(({ todo }) => ({
        id: uuidV4(),
        idMeeting,
        createdBy,
        todo,
        idPerson,
      })),
    );

    return this.save(todosInstance);
  },

  find({ page, perPage, deleted, query, order }) {
    const hasDeletion = deleted === true || deleted === false;
    const queryDeleted = 'todos.deleted = :deleted';
    const hasPagination = page && perPage;

    let hasQuery = hasDeletion;

    const builder = this.createQueryBuilder('todos');

    if (hasDeletion) builder.where(queryDeleted, { deleted });

    if (query) {
      const { fields, value } = query;

      if (hasQuery) {
        builder.andWhere(
          new Brackets(subQb => {
            fields.forEach(field => {
              subQb.orWhere(`${field} ILIKE :query`, { query: `%${value}%` });
            });
          }),
        );
      } else {
        fields.forEach((field, index) => {
          const method = index === 0 ? builder.where : builder.andWhere;

          method(`${field} ILIKE :query`, { query: `%${value}%` });
        });
      }

      hasQuery = true;
    }

    if (hasPagination) builder.take(page * perPage - perPage).skip(perPage);

    if (order) {
      const { fields, type } = order;
      fields.forEach((field, index) => {
        const method = index === 0 ? builder.orderBy : builder.addOrderBy;

        method(field, type[index]);
      });
    }

    return builder.getManyAndCount();
  },

  findByMeeting({ page, perPage, deleted, query, idMeeting, order }) {
    const hasDeletion = deleted === true || deleted === false;
    const queryDeleted = 'todos.deleted = :deleted';
    const hasPagination = page && perPage;

    const builder = this.createQueryBuilder('todos').where(
      'todos.idMeeting = :id',
      { id: idMeeting },
    );

    if (hasDeletion) builder.where(queryDeleted, { deleted });

    if (query) {
      const { fields, value } = query;

      builder.andWhere(
        new Brackets(subQb => {
          fields.forEach(field => {
            subQb.orWhere(`${field} ILIKE :query`, { query: `%${value}%` });
          });
        }),
      );
    }

    if (hasPagination) builder.take(page * perPage - perPage).skip(perPage);

    if (order) {
      const { fields, type } = order;
      fields.forEach((field, index) => {
        const method = index === 0 ? builder.orderBy : builder.addOrderBy;

        method(field, type[index]);
      });
    }

    return builder.getManyAndCount();
  },
});
