import { authRouter } from './router/auth';
import { personRouter } from './router/person';
import { questionRouter } from './router/question';
import { topicRouter } from './router/topic';
import { userRouter } from './router/user';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  person: personRouter,
  question: questionRouter,
  topic: topicRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
