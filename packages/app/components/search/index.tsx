import { useEffect, type FC } from 'react';
import type { InputProps, ViewProps } from '@acme/ui';
import { MyInput, UnstyledInput, View } from '@acme/ui';
import { create, insert, insertMultiple, search } from '@orama/orama'
import { useQuery } from '@tanstack/react-query';
interface Props extends Omit<InputProps, 'value'> {
  data: any[];
  schema: Record<string, unknown>;
  query: string;
}

export const SearchInput: FC<Props> = ({
  size = '$4',
  data,
  schema,
  query,
  ...rest
}) => {

  const insertData = async (data: any, schema: any) => {
    const db = await create({
      schema: { ...schema } as const,
    })
    await insertMultiple(db, data)
    return db;
  }
  const awaitSearch = async (db: any, query: string) => {
    const searchResult = await search(db, {
      term: query,
      // properties: ['question'],
    })
    console.log(searchResult.hits)
    return searchResult.hits;
  }

  const { data: db } = useQuery({
    queryKey: ['db', data, schema],
    queryFn: () => insertData(data, schema),
  })
  useQuery({
    queryKey: ['search', data, schema, query],
    queryFn: () => awaitSearch(db, query),
    enabled: !!query,
  })

  return (
    <UnstyledInput
      size={size}
      minWidth="100%"
      placeholderTextColor={'$secondaryColor'}
      placeholder='Search'
      value={query}
      {...rest}
    />
  );
};

export * from './search-everything'