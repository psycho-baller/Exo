// Index.tsx
import React, { useEffect, useRef, useState } from 'react'

import type { RouterOutputs } from '@acme/api'
import { api } from '@acme/api/utils/trpc'
import { MyInput, Text, UnstyledInput, YStack } from '@acme/ui'

import { MainPage } from '../../components/Footer/MainPage'
import LinkButton from '../../components/LinkButton'
import { getFullName, getSingularFromPlural } from '../../utils/strings'
import SearchHistory from './SearchHistory'
import { useHeaderHeight } from '@react-navigation/elements'
import { Platform } from 'react-native'
import { useAtom } from 'jotai'
import { queryAtom } from '../../atoms/search'
import { SearchEverything } from '../../components/search'
import { useQuery } from '@tanstack/react-query'

interface SearchResult {
  document: {
    id: string;
    question: string;
  }
}

const QuestionSearch = () => {
  const [query, setQuery] = useAtom(queryAtom)
  const questionQuery = api.question.all.useQuery()
  const schema = {
    question: 'string',
  }

  const data = questionQuery.data?.map((question) => ({
    question: question.question,
  })) ?? []

  const { data: searchResult } = useQuery<SearchResult[]>({ queryKey: ['search', data, schema, query] })
  console.log(searchResult)
  return (
    <>
      {
        searchResult?.map((hit) => (
          <LinkButton key={hit.document.id} href={`/questions/${hit.document.id}`}>
            {hit.document.question}
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
        <QuestionSearch />
      </YStack>
    </MainPage>
  )
}

export default Index
