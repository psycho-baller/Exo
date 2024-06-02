import { authRouter } from './router/auth'
import { groupRouter, groupInvalidators } from './router/group'
import { groupsOfPeopleRouter, groupsOfPeopleInvalidators } from './router/groupsOfPeople'
import { personRouter, personInvalidators } from './router/person'
import { questionRouter, questionInvalidators } from './router/question'
import { questionTopicRouter } from './router/questionTopic'
import { searchHistoryRouter } from './router/searchHistory'
import { topicRouter } from './router/topic'
import { userRouter } from './router/user'

export const appRouter = {
  useUtils: () => ({
    ...questionInvalidators,
    ...personInvalidators,
    ...groupInvalidators,
    ...groupsOfPeopleInvalidators,
  }),

  // auth: authRouter,
  // user: userRouter,
  person: personRouter,
  question: questionRouter,
  // topic: topicRouter,
  // questionTopic: questionTopicRouter,
  group: groupRouter,
  // searchHistory: searchHistoryRouter,
  groupsOfPeople: groupsOfPeopleRouter,
}

// export type definition of API
export type AppRouter = typeof appRouter

export type AppRouterKeys = Exclude<keyof typeof appRouter & string, '_def' | 'createCaller'>
