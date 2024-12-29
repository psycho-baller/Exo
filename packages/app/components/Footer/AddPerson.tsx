import { api } from '@rooots/api/utils/trpc'
import type { YStackProps } from '@rooots/ui'
import { AutocompleteInput, Button, Label, Text, YStack } from '@rooots/ui'

import { useAddPersonStore } from '../../stores/addQuestion'
import type { PersonStore } from '../../types/people'
import { getFullName } from '../../utils/strings'

export const AddPerson = (props: YStackProps) => {
  const personQuery = api.person.all.useQuery()
  const addPersonMutation = api.person.create.useMutation({
    onSettled: async () => {
      await personQuery.refetch()
    },
  })
  const [personSearch, setPersonSearch, setSelectedPerson] = useAddPersonStore((state) => [
    state.personSearch,
    state.setPersonSearch,
    state.setSelectedPerson,
  ])
  if (personQuery.isLoading) {
    return <Text>Loading...</Text>
  }
  if (personQuery.error) {
    return <Text>Error: {personQuery.error.message}</Text>
  }

  const personData: PersonStore[] = []

  for (const person of personQuery.data ?? []) {
    const { firstName, lastName = null, id }: PersonStore = person
    personData.push({ firstName, lastName, id })
  }

  const filterPeopleFromSearch = (people: PersonStore[], search: string) => {
    console.log('people', people)
    return people.filter((person) => {
      const personFullName = getFullName(
        person.firstName.toLowerCase(),
        person.lastName?.toLowerCase(),
      )
      const searchFullName = search.toLowerCase()
      return personFullName.includes(searchFullName)
    })
  }
  const onPersonSearch = (value: string) => {
    // check if there is a person with that name and set it as selected person if there is
    const matchedPerson = personData.find(
      (person) => value.trim() === getFullName(person.firstName, person.lastName),
    )
    matchedPerson ? setSelectedPerson(matchedPerson) : setSelectedPerson(null)
  }

  const onPersonSelected = (item: PersonStore) => {
    setPersonSearch(getFullName(item.firstName, item.lastName))
    setSelectedPerson(item)
    onPersonSearch(getFullName(item.firstName, item.lastName))
  }

  const addPerson = () => {
    addPersonMutation.mutate({
      firstName: personSearch.split(' ')[0] || personSearch,
      lastName: personSearch.split(' ')[1],
    })
  }

  const onNoPersonMatchingSearch: () => JSX.Element = () => (
    <Button onPress={() => addPerson()}>
      <Text> Add Person</Text>
    </Button>
  )

  const keyExtractor = (item: PersonStore) => item.id.toString()

  return (
    <YStack {...props}>
      <Label fontSize={'$1'} unstyled color='$secondaryColor' htmlFor='person'>
        PERSON
      </Label>
      <AutocompleteInput
        data={personQuery.data ?? []}
        width={200}
        fontSize={'$8'}
        paddingVertical={'$2'}
        placeholder='Add Person'
        value={personSearch}
        setValue={setPersonSearch}
        filter={filterPeopleFromSearch}
        onSearch={onPersonSearch}
        keyExtractor={keyExtractor}
        renderItem={(item: PersonStore) => getFullName(item?.firstName, item?.lastName)}
        onEmptyList={onNoPersonMatchingSearch}
        onSelect={onPersonSelected}
        insideBottomSheet

      />
      {/* <personDropdown dropdownRef={dropdownRef} /> */}
    </YStack>
  )
}
