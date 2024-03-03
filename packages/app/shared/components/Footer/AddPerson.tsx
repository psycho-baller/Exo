import type { YStackProps } from 'tamagui';
import { Label, YStack } from 'tamagui';

import { api } from '@acme/api/utils/trpc';
import { AutocompleteInput, Text } from '@acme/ui';

import { useAddPersonStore } from '../../../stores/addQuestion';

export const AddPerson = (props: YStackProps) => {
  const [personSearch, setPersonSearch, setSelectedPerson] = useAddPersonStore((state) => [
    state.personSearch,
    state.setPersonSearch,
    state.setSelectedPerson,
  ]);
  const personQuery = api.person.all.useQuery();
  if (personQuery.isLoading) {
    return <Text>Loading...</Text>;
  }
  if (personQuery.error) {
    return <Text>Error: {personQuery.error.message}</Text>;
  }
  const personData =
    personQuery.data?.map((person) => {
      return { name: person.firstName, id: person.id };
    }) ?? [];

  const filterPeopleFromSearch = (people: { name: string; id: number }[], search: string) => {
    return people.filter((person) => {
      return person.name.toLowerCase().includes(search.toLowerCase());
    });
  };
  const onPersonSearch = (value: string) => {
    // check if there is a person with that name and set it as selected person if there is
    const person = personData.find((person) => person.name === value);
    person ? setSelectedPerson(person) : setSelectedPerson(null);
  };

  const keyExtractor = (item: { name: string; id: number }) => item.name;

  return (
    <YStack {...props}>
      <Label fontSize={'$1'} unstyled color='$secondaryColor' htmlFor='person'>
        person
      </Label>
      <AutocompleteInput
        placeholderTextColor='$secondaryColor'
        opacity={0.75}
        data={personData}
        width={200}
        fontSize={'$8'}
        paddingVertical={'$2'}
        placeholder='Add person'
        value={personSearch}
        setValue={setPersonSearch}
        filter={filterPeopleFromSearch}
        onSearch={onPersonSearch}
        keyExtractor={keyExtractor}
      />
      {/* <personDropdown dropdownRef={dropdownRef} /> */}
    </YStack>
  );
};
