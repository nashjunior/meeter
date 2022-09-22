import { meetingRouter } from '@modules/meetings/meeting/routers';
import { userRouter } from '@modules/users/user/routers';
import { server } from './app';

server.register(userRouter, { prefix: '/users' });
server.register(meetingRouter, { prefix: '/meetings' });
