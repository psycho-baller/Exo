import { useEffect, type FC } from 'react';
import type { InputProps, ViewProps } from '@acme/ui';
import { MyInput, UnstyledInput, View } from '@acme/ui';
import { create, insertMultiple, search } from '@orama/orama'
import { useQuery, useQueryClient } from '@tanstack/react-query';
interface Props extends Omit<InputProps, 'value'> {
  data: any[];
  schema: Record<string, unknown>;
  query: string;
}



const insertData = async (data: any, schema: Record<string, unknown>) => {
  console.info("inserting data", data)
  const db = await create({
    schema: { ...schema } as const,
  })
  await insertMultiple(db, data)
  return db;
}
const awaitSearch = async (db: any, query: string) => {
  console.info("searching for", query)
  const searchResult = await search(db, {
    term: query,
  })
  // properties: ['question'],
  console.log("searchResult.hits.document", searchResult.hits)
  return searchResult.hits;
}

export const SearchInput: FC<Props> = ({
  size = '$4',
  data,
  schema,
  query,
  ...rest
}) => {
  const { data: db, error: DBError } = useQuery({
    queryKey: ['db', data, schema],
    queryFn: () => insertData(data, schema),
  })

  const { error } = useQuery({
    queryKey: ['search', db, query],
    queryFn: () => awaitSearch(db, query),
    // enabled: !!query,
  })
  if (DBError) {
    console.error(DBError)
    // return null
  }
  if (error) {
    console.error(error)
    // return null
  }

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