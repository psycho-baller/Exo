import type { FC } from 'react';
import type { ViewProps } from '@acme/ui';
import { SearchInput } from '.'
import { useAtom } from 'jotai'
import { queryAtom } from '../../atoms/search'
import { api } from '@acme/api/utils/trpc'
import { filterDataFromSchema, groupSchema, personSchema, questionSchema } from '../../utils/search';

interface Props extends ViewProps {

}

export const SearchEverythingInput: FC = () => {
  const [query, setQuery] = useAtom(queryAtom)

  const questionQuery = api.question.all.useQuery()
  const questions = questionQuery.data ? filterDataFromSchema(questionQuery.data, questionSchema) : []

  const personQuery = api.person.all.useQuery()
  const people = personQuery.data ? filterDataFromSchema(personQuery.data, personSchema) : []

  const groupQuery = api.group.all.useQuery()
  const groups = groupQuery.data ? filterDataFromSchema(groupQuery.data, groupSchema) : []

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
        },
        {
          schema: groupSchema,
          data: groups,
        }
      ]}
      labelText='Search'
      focusOnMount={true}
      query={query}
      onChangeText={setQuery}
    />
  );
};