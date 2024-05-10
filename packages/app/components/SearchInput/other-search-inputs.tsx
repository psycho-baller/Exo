import type { FC } from 'react';
import type { ViewProps } from '@acme/ui';
import { SearchInput } from '.'
import { useAtom } from 'jotai'
import { groupsQueryAtom, peopleQueryAtom, topicsQueryAtom } from '../../atoms/search'
import { api } from '@acme/api/utils/trpc'
import { filterDataFromSchema, groupSchema, personSchema, questionSchema } from '../../utils/search';

interface Props extends ViewProps {

}

export const PeopleSearchInput: FC = () => {
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

export const GroupSearchInput: FC = () => {
  const [query, setQuery] = useAtom(groupsQueryAtom)
  const groupQuery = api.group.all.useQuery()
  const groups = groupQuery.data ? filterDataFromSchema(groupQuery.data, groupSchema) : []

  return (
    <SearchInput
      size='$5'
      datasets={[
        {
          schema: personSchema,
          data: groups,
        }
      ]}
      labelText='Search for a group'
      focusOnMount={true}
      query={query}
      onChangeText={setQuery}
    />
  );
};

// TODO: Use this
export const TopicsSearchInput: FC = () => {
  const [query, setQuery] = useAtom(topicsQueryAtom)
  const topicsQuery = api.topic.all.useQuery()
  const groups = topicsQuery.data ? filterDataFromSchema(topicsQuery.data, groupSchema) : []

  return (
    <SearchInput
      size='$5'
      datasets={[
        {
          schema: personSchema,
          data: groups,
        }
      ]}
      labelText='Search for a topic'
      focusOnMount={true}
      query={query}
      onChangeText={setQuery}
    />
  );
}