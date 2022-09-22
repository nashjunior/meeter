import { MeetingUserController } from '@modules/users/user';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { MeetingsController } from '../controllers';

const meetingUserController = new MeetingUserController();
const meetingsMeetingController = new MeetingsController();

export const meetingRouter = function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void,
) {
  fastify.get('/', meetingsMeetingController.list);
  fastify.post('/', meetingUserController.create);

  done();
};
