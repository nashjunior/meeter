import { MeetingUserController } from '@modules/users/user';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const meetingUserController = new MeetingUserController();

export const meetingRouter = function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void,
) {
  fastify.post('/', meetingUserController.create);

  done();
};
