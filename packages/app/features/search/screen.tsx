import type { RouterOutputs } from '@acme/api'
import { api } from '@acme/api/utils/trpc'
import { Text, YStack } from '@acme/ui'

import { MainPage } from '../../components/Footer/MainPage'
import LinkButton from '../../components/LinkButton'
import { getFullName, getSingularFromPlural } from '../../utils/strings'
import SearchHistory from './SearchHistory'
import { useHeaderHeight } from '@react-navigation/elements'
import { Platform } from 'react-native'
import { useAtom } from 'jotai'
import { queryAtom } from '../../atoms/search'
import { SearchEverythingInput } from '../../components/SearchInput/SearchEverythingInput'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import type { GroupSearchResult, PersonSearchResult, QuestionSearchResult } from '../../utils/search'
import { filterDataFromSchema, questionSchema, personSchema, groupSchema } from '../../utils/search'
import { SearchResult } from './SearchResult'


const QuestionSearch = () => {
  const [query] = useAtom(queryAtom)
  const questionQuery = api.question.all.useQuery()

  const questions = questionQuery.data ? filterDataFromSchema(questionQuery.data, questionSchema) : []
  const queryClient = useQueryClient();
  const db = queryClient.getQueryData(['db', questions, questionSchema])
  const searchResult = useQuery<QuestionSearchResult[]>({
    queryKey: ['search', db, query],
    enabled: false,
  })
  console.log("searchResult", searchResult)
  return (
    <>
      {
        searchResult.data?.map((hit) => (
          <LinkButton key={hit.document.id} href={`/questions/${hit.document.id}`}>
            {hit.document.question}
          </LinkButton>
        ))
      }
    </>
  )
}

const PersonSearch = () => {
  const [query] = useAtom(queryAtom)
  const personQuery = api.person.all.useQuery()

  const people = personQuery.data ? filterDataFromSchema(personQuery.data, personSchema) : []
  const queryClient = useQueryClient();
  const db = queryClient.getQueryData(['db', people, personSchema])
  const searchResult = useQuery<PersonSearchResult[]>({
    queryKey: ['search', db, query],
    enabled: false,
  })
  console.log("searchResult", searchResult)
  return (
    <>
      {
        searchResult.data?.map((hit) => (
          <LinkButton key={hit.document.id} href={`/people/${hit.document.id}`}>
            {hit.document.firstName}{hit.document.lastName ?? ''}
          </LinkButton>
        ))
      }
    </>
  )
}

const Index = () => {
  const headerHeight = Platform.OS !== 'web' ? useHeaderHeight() : 0

  return (
    <MainPage paddingTop={headerHeight}>
      {Platform.OS === 'web' && <SearchEverythingInput />}
      <YStack>
        {/* Render search results */}
        <YStack paddingTop='$4' columnGap='$4'>
          <SearchResult<QuestionSearchResult, RouterOutputs['question']['all'][number]>
            useQueryResult={api.question.all.useQuery as () => UseQueryResult<RouterOutputs['question']['all']>}
            filterSchema={questionSchema}
            resultKey="questions"
            queryAtom={queryAtom}
            renderHit={(hit: QuestionSearchResult) => (
              <LinkButton key={hit.document.id} href={`/questions/${hit.document.id}`}>
                {hit.document.question}
              </LinkButton>
            )}
          />
          <SearchResult<PersonSearchResult, RouterOutputs['person']['all'][number]>
            useQueryResult={api.person.all.useQuery as () => UseQueryResult<RouterOutputs['person']['all']>}
            filterSchema={personSchema}
            resultKey="people"
            queryAtom={queryAtom}
            renderHit={(hit: PersonSearchResult) => (
              <LinkButton key={hit.document.id} href={`/people/${hit.document.id}`}>
                {hit.document.firstName}{hit.document.lastName ?? ''}
              </LinkButton>
            )}
          />
          <SearchResult<GroupSearchResult, RouterOutputs['group']['all'][number]>
            useQueryResult={api.group.all.useQuery as () => UseQueryResult<RouterOutputs['group']['all']>}
            filterSchema={groupSchema}
            resultKey="groups"
            queryAtom={queryAtom}
            renderHit={(hit: GroupSearchResult) => (
              <LinkButton key={hit.document.id} href={`/groups/${hit.document.id}`}>
                {hit.document.name}
              </LinkButton>
            )}
          />
        </YStack>

        <SearchHistory />
      </YStack>
    </MainPage>
  )
}

export default Index
