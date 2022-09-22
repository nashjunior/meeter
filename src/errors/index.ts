export * from './AppError';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { EntityNotFoundError } from 'typeorm';
import { ValidationError } from 'yup';
import { AppError } from './AppError';

type IError = {
  error: string;
  statusCode: number;
  message: any;
  where?: string;
};

export const errorMiddleware = (
  err: FastifyError,
  req: FastifyRequest,
  res: FastifyReply,
) => {
  let error: IError = {
    statusCode: 500,
    error: 'Internal server Error',
    message: err?.message,
  };

  console.log(err);

  if (err instanceof ValidationError) {
    error = {
      statusCode: 422,
      error: 'Could not Process request',
      message: err.errors,
    };
  }

  if (err instanceof EntityNotFoundError) {
    const [message, cause] = err.message.split('matching: ');

    error = {
      statusCode: 404,
      error: err.name,
      message,
      where: JSON.parse(cause)?.where,
    };
  }

  if (err instanceof AppError) {
    error = {
      error: 'Bad Request',
      message: err.message,
      statusCode: err.statusCode,
    };
  }

  res.status(error.statusCode).send(error);
};
