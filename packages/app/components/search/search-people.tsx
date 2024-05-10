import type { FC } from 'react';
import type { ViewProps } from '@acme/ui';
import { SearchInput } from '.'
import { useAtom } from 'jotai'
import { peopleQueryAtom } from '../../atoms/search'
import { api } from '@acme/api/utils/trpc'
import { filterDataFromSchema, personSchema, questionSchema } from '../../utils/search';

interface Props extends ViewProps {

}

export const SearchPeople: FC = () => {
  const [query, setQuery] = useAtom(peopleQueryAtom)
  const personQuery = api.person.all.useQuery()
  const people = personQuery.data ? filterDataFromSchema(personQuery.data, personSchema) : []

  return (
    <SearchInput
      size='$5'
      datasets={[
        {
          schema: personSchema,
          data: people,
        }
      ]}
      labelText='Search for a person'
      focusOnMount={true}
      query={query}
      onChangeText={setQuery}
    />
  );
};