import type { FC } from 'react';
import type { ViewProps } from '@acme/ui';
import { SearchInput } from '.'
import { useAtom } from 'jotai'
import { queryAtom } from '../../atoms/search'
import { api } from '@acme/api/utils/trpc'
import { filterDataFromSchema, personSchema, questionSchema } from '../../utils/search';

interface Props extends ViewProps {

}

export const SearchEverything: FC = () => {
  const [query, setQuery] = useAtom(queryAtom)

  const questionQuery = api.question.all.useQuery()

  const questions = questionQuery.data ? filterDataFromSchema(questionQuery.data, questionSchema) : []

  const personQuery = api.person.all.useQuery()
  const people = personQuery.data ? filterDataFromSchema(personQuery.data, personSchema) : []

  return (
    <SearchInput
      size='$5'
      datasets={[
        {
          schema: questionSchema,
          data: questions,
        },
        {
          schema: personSchema,
          data: people,
        }
      ]}
      labelText='Search'
      focusOnMount={true}
      query={query}
      onChangeText={setQuery}
    />
  );
};