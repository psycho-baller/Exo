import { authRouter } from './router/auth';
import { groupRouter } from './router/group';
import { groupsOfPeopleRouter } from './router/groupsOfPeople';
import { personRouter } from './router/person';
import { questionRouter } from './router/question';
import { questionTopicRouter } from './router/questionTopic';
import { searchHistoryRouter } from './router/searchHistory';
import { topicRouter } from './router/topic';
import { userRouter } from './router/user';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  person: personRouter,
  question: questionRouter,
  topic: topicRouter,
  questionTopic: questionTopicRouter,
  group: groupRouter,
  searchHistory: searchHistoryRouter,
  groupsOfPeople: groupsOfPeopleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type AppRouterKeys = Exclude<keyof typeof appRouter & string, '_def' | 'createCaller'>;
