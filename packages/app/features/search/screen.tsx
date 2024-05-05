// Index.tsx
import { useRef } from 'react'

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
import { SearchEverything } from '../../components/search'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { PersonSearchResult, QuestionSearchResult } from '../../utils/search'
import { filterDataFromSchema, questionSchema, personSchema } from '../../utils/search'


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
  const searchTermRef = useRef<string>('') // This ref will store the last non-empty search term.

  const createSearchHistory = api.searchHistory.create.useMutation()

  // tRPC hooks for searching people, groups, and questions
  // const peopleSearch = api.person.search.useQuery(
  //   { query },
  //   { enabled: query.length > 0 },
  // )
  // const groupSearch = api.group.search.useQuery(
  //   { query },
  //   { enabled: query.length > 0 },
  // )
  // const questionSearch = api.question.search.useQuery(
  //   { query },
  //   { enabled: query.length > 0 },
  // )

  // Function to render search result section
  const renderSearchSection = (slug: 'people' | 'groups' | 'questions', data: unknown) => {
    const singularSlug = getSingularFromPlural(slug)
    type SingularSlug = typeof singularSlug
    type Data = RouterOutputs[SingularSlug]['all']
    const dataTyped = data as Data
    // give the data a type
    // capitalize the first letter of the slug
    const title = slug.charAt(0).toUpperCase() + slug.slice(1)

    if (query && dataTyped && dataTyped.length > 0) {
      return (
        <YStack paddingTop='$4' columnGap='$1'>
          <Text fontWeight='bold'>{title}</Text>
          {dataTyped.map((item) => (
            <LinkButton key={item.id} href={`/${slug}/${item.id}`}>
              {slug === 'people'
                ? getFullName(item.firstName, item.lastName)
                : slug === 'groups'
                  ? item.name
                  : item.question}
            </LinkButton>
          ))}
        </YStack>
      )
    } else if (query && (!dataTyped || dataTyped.length === 0)) {
      return (
        <YStack marginTop='$2'>
          <Text fontWeight='bold'>{title}</Text>
          <Text color='grey'>No results found</Text>
        </YStack>
      )
    }
    return null
  }

  return (
    <MainPage paddingTop={headerHeight}>
      {Platform.OS === 'web' && <SearchEverything />}
      <YStack>
        {/* Render search results */}
        <YStack paddingTop='$4' columnGap='$4'>
          {/* {renderSearchSection('people', peopleSearch.data)} */}
          {/* {renderSearchSection('groups', groupSearch.data)} */}
          {/* {renderSearchSection('questions', questionSearch.data)} */}
        </YStack>

        <SearchHistory />
        <PersonSearch />
        <QuestionSearch />

      </YStack>
    </MainPage>
  )
}

export default Index
