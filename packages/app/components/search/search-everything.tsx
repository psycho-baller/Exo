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
  const questionQuery = api.question.all.useQuery()
  const schema = {
    question: 'string',
  }

  const data = questionQuery.data?.map((question) => ({
    question: question.question,
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
      data={data}
      schema={schema}
      labelText='Search'
      focusOnMount={true}
      query={query}
      onChangeText={setQuery}
    />
  );
};