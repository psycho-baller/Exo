import type { FC } from 'react';
import type { ViewProps } from '@rooots/ui';
import { SearchInput } from '.'
import { useAtom } from 'jotai'
import { groupsQueryAtom, peopleQueryAtom, topicsQueryAtom } from '../../atoms/search'
import { api } from '@rooots/api/utils/trpc'
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
      placeholder='Search for a person'
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
      placeholder='Search for a group'
      query={query}
      onChangeText={setQuery}
      insideBottomSheet
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
      placeholder='Search for a topic'
      query={query}
      onChangeText={setQuery}
    />
  );
}