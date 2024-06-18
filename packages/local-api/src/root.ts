import { useQueryClient } from '@tanstack/react-query'
import { authRouter } from './router/auth'
import { groupRouter, groupInvalidators } from './router/group'
import { groupsOfPeopleRouter, groupsOfPeopleInvalidators } from './router/groupsOfPeople'
import { personRouter, personInvalidators } from './router/person'
import { questionRouter, questionInvalidators } from './router/question'
import { questionTopicRouter, questionTopicInvalidators } from './router/questionTopic'
import { searchHistoryRouter, searchHistoryInvalidators } from './router/searchHistory'
import { topicRouter, topicInvalidators } from './router/topic'
import { userRouter } from './router/user'

export const appRouter = {
  useUtils: () => {
    const queryClient = useQueryClient()
    return {
      question: questionInvalidators(queryClient),
      person: personInvalidators(queryClient),
      group: groupInvalidators(queryClient),
      groupsOfPeople: groupsOfPeopleInvalidators(queryClient),
      questionTopic: questionTopicInvalidators(queryClient),
      topic: topicInvalidators(queryClient),
      searchHistory: searchHistoryInvalidators(queryClient),
    }
  },

  // auth: authRouter,
  // user: userRouter,
  person: personRouter,
  question: questionRouter,
  topic: topicRouter,
  questionTopic: questionTopicRouter,
  group: groupRouter,
  searchHistory: searchHistoryRouter,
  groupsOfPeople: groupsOfPeopleRouter,
}

// export type definition of API
export type AppRouter = typeof appRouter

export type AppRouterKeys = Exclude<keyof typeof appRouter & string, '_def' | 'createCaller'>
