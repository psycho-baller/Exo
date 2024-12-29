import type { FC } from 'react';
import type { InputProps } from '@rooots/ui';
import { BottomSheetInput, UnstyledInput } from '@rooots/ui';
import { create, insertMultiple, search } from '@orama/orama'
import { useQueries } from '@tanstack/react-query';
interface Props extends Omit<InputProps, 'value'> {
  datasets: {
    data: any;
    schema: Record<string, unknown>;
  }[];
  query: string;
  insideBottomSheet?: boolean;
}

const insertData = async (data: any, schema: Record<string, unknown>) => {
  console.info("inserting data", data)
  const db = await create({
    schema: { ...schema } as const,
  })
  await insertMultiple(db, data)
  return db;
}
export const awaitSearch = async (db: any, query: string) => {
  console.info("searching for", query)
  const searchResult = await search(db, {
    term: query,
  })
  // properties: ['question'],
  console.log("searchResult.hits.document", searchResult.hits)
  return searchResult.hits;
}

export const SearchInput: FC<Props> = ({
  query,
  datasets,
  size = '$4',
  insideBottomSheet = false,
  ...rest
}) => {
  // const queryClient = useQueryClient();

  const dbQueries = useQueries({
    queries: datasets.map((data, index) => ({
      enabled: !!data.data && data.data.length > 0,
      queryKey: ['db', data.data, data.schema],
      queryFn: () => insertData(data.data, data.schema),
    }))
  });

  const searchQueries = useQueries({
    queries: dbQueries.map((dbQuery, index) => ({
      enabled: !!dbQuery.data,
      queryKey: ['search', dbQuery.data, query],
      queryFn: () => awaitSearch(dbQuery.data, query),
    }))
  });

  const DBErrors = dbQueries.filter((query) => query.error);
  const searchErrors = searchQueries.filter((query) => query.error);

  if (DBErrors.length > 0) {
    console.error("DBErrors", DBErrors);
    // return null
  }
  if (searchErrors.length > 0) {
    console.error("searchErrors", searchErrors);
    return null
  }

  const Input = insideBottomSheet ? BottomSheetInput : UnstyledInput;

  return (
    <Input
      size={size}
      minWidth="100%"
      placeholderTextColor={'$secondaryColor'}
      placeholder='Search'
      value={query}
      autoFocus
      {...rest}
    />
  );
};
