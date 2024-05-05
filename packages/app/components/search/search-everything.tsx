import { useEffect, type FC, useState } from 'react';
import type { ViewProps } from '@acme/ui';
import { SearchInput } from '../search'
import { useAtom } from 'jotai'
import { queryAtom } from '../../atoms/search'
import { api } from '@acme/api/utils/trpc'
import { create, insert, insertMultiple, search } from '@orama/orama';

interface Props extends ViewProps {

}

export const SearchEverything: FC = () => {
  const [query, setQuery] = useAtom(queryAtom)
  const [db, setDb] = useState<any>(null)
  const questionQuery = api.question.all.useQuery()
  const schema = {
    question: 'string',
  } as const

  const data = questionQuery.data?.map((question) => ({
    question: question.question,
  })) ?? []

  useEffect(() => {
    const fetchData = async () => {
      const db = await create({
        schema: { ...schema } as const,
      })
      await insertMultiple(db, data)
      setDb(db)
    }
    fetchData();
  }, []);

  useEffect(() => {
    const awaitSearch = async () => {
      console.log('searching...', query, db)
      const searchResult = await search(db, {
        term: query,
        // properties: ['question'],
      })
      console.log(searchResult.hits)
    }

    awaitSearch()
  }, [query, db]);

  return (
    <SearchInput
      size='$5'
      data={data}
      schema={schema}
      labelText='Search'
      focusOnMount={true}
      value={query}
      onChangeText={setQuery}
    />
  );
};