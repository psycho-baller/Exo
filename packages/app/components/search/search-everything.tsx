import { useState } from 'react';
import type { FC } from 'react';
import type { ViewProps } from '@acme/ui';
import { SearchInput } from '../search'
import { atom, useAtom } from 'jotai'
import { queryAtom } from '../../atoms/search'
import { api } from '@acme/api/utils/trpc'
import { create, insertMultiple, search } from '@orama/orama';
import { useQuery } from '@tanstack/react-query';

interface Props extends ViewProps {

}

export const SearchEverything: FC = () => {
  const [query, setQuery] = useAtom(queryAtom)

  const questionSchema = {
    id: 'string',
    question: 'string'
  }
  const questionQuery = api.question.all.useQuery()
  const questions = questionQuery.data?.map((question) => ({
    id: question.id.toString(),
    question: question.question,
  })) ?? []

  const personSchema = {
    id: 'string',
    firstName: 'string',
    lastName: 'string',
    // email: 'string',
    // phoneNumber: 'string',
    // reminderDatetime: 'string',
  }
  const personQuery = api.person.all.useQuery()
  const people = personQuery.data?.map((person) => ({
    id: person.id.toString(),
    firstName: person.firstName,
    lastName: person.lastName ?? '',
    // email: person.email,
    // phoneNumber: person.phoneNumber,
    // reminderDatetime: person.reminderDatetime,
  })) ?? []

  // const { data: db } = useQuery({
  //   queryKey: ['db', data, schema],
  //   queryFn: () => fetchData(data, schema),
  // })
  // useQuery({
  //   queryKey: ['search', data, schema, query],
  //   queryFn: () => awaitSearch(db, query),
  //   enabled: !!query,
  // })

  return (
    <SearchInput
      size='$5'
      datas={
        [
          {
            schema: questionSchema,
            data: questions,
          },
          {
            schema: personSchema,
            data: people,
          }
        ]
      }
      labelText='Search'
      focusOnMount={true}
      query={query}
      onChangeText={setQuery}
    />
  );
};