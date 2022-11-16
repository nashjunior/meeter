import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { MeetingsController, TodosMeetingController } from '../controllers';

const meetingsMeetingController = new MeetingsController();
const todosMeetingController = new TodosMeetingController();

export const meetingTodosRouter = function (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: (error?: Error) => void,
) {
  fastify.get('/', meetingsMeetingController.listTodos);
  fastify.post('/', todosMeetingController.create);

  done();
};
