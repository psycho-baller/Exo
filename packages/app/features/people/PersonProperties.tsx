import { CalendarDays, Tag, User, Users, X } from '@tamagui/lucide-icons'

import type { RouterOutputs } from '@rooots/api'
import { api } from '@rooots/api/utils/trpc'
import { Button, MyDateTimePicker, TagButton, Text, View, XStack, YStack } from '@rooots/ui'

import { getFullName } from '../../utils/strings'
import { groupSheetRefAtom, personSheetRefAtom, topicsSheetRefAtom } from '../../atoms/propertiesSheet'
import { useAtom } from 'jotai'
import { BottomSheet } from '../../components/BottomSheet'
import { SearchGroupSheet } from './SearchGroupSheet'

type Props = RouterOutputs['person']['all'][number]

// TODO: Make this more modular: pass in an object with all the data and this component jsut renders it. If some data is not available, do like todoist and show a list of horizontal buttons to add the data.
export function PersonProperties({ id, reminderDatetime, firstName, createdByUserId }: Props) {
  const utils = api.useUtils()
  const { mutate: update } = api.person.update.useMutation({
    async onSuccess() {
      await utils.person.byId.invalidate({ id: id })
      // await utils.question.all.invalidate()
    },
  })
  const [groupSheetRef] = useAtom(groupSheetRefAtom)
  const showGroupSheet = () => groupSheetRef?.current?.present()
  const onChange = async (date: Date | null) => {
    update({
      id,
      reminderDatetime: date,
      // createdByUserId,
      firstName,
    })
    // await utils.question.byId.invalidate({ id: id })
  }

  return (
    <YStack gap='$3' padding='$2.5'>
      <XStack alignItems='center' columnGap='$5'>
        <CalendarDays size={20} />
        {reminderDatetime ? (
          <XStack
            flex={1}
            alignItems='center'
            justifyContent='space-between'
            marginLeft={-10}
          >
            <MyDateTimePicker
              mode='date'
              value={reminderDatetime}
              onChange={onChange}
            />
            <X
              color='$red9'
              size='$2'
              onPress={() => {
                onChange(null)
              }}
            />
          </XStack>
        ) : (
          <TagButton
            size='$2.5'
            borderColor='transparent'
            onPress={() => {
              onChange(new Date())
            }}
          >
            Add reminder
          </TagButton>
        )}
      </XStack>
      {/* <XStack columnGap='$5' /> */}
      <XStack columnGap='$5' onPress={showGroupSheet} alignItems='center'>
        <Users size={20} />
        {/* <Button unstyled> */}
        <GroupProperty personId={id} />
        {/* </Button> */}
      </XStack>
      <Sheets personId={id} />
    </YStack>
  )
}

// TODO: After we turn all createdByUsername to createdByUserId
const GroupProperty = ({ personId }: { personId: number }) => {
  const { data } = api.groupsOfPeople.getGroupsFromPersonId.useQuery({
    id: personId,
  })

  return (
    <XStack columnGap='$2.5'>
      {!data?.length && (
        // send button clicks to the parent component
        <Text fontSize='$6' color='$secondaryColor'>
          Click to connnect to a group
        </Text>
      )}
      {data?.map((group) => (
        <TagButton key={group.id} size='$2.5'
          borderColor='transparent'
          textProps={{
            textTransform: 'none'
          }}
        >{group.name}</TagButton>
      ))
      }
    </XStack >
  )
}


const Sheets = ({ personId }: { personId: number }) => {
  // const personRef = useRef<BottomSheetModalRef>(null)
  // const groupRef = useRef<BottomSheetModalRef>(null)
  return (
    <>
      {/* <BottomSheet
        // ref={personRef}
        sheetRefAtom={personSheetRefAtom}
      >
        <SearchPeopleSheet personId={personId} />
      </BottomSheet> */}
      <BottomSheet
        // ref={groupRef}
        footerComponent={() => (
          <Button onPress={() => console.log('add group')}>Add group</Button>
        )}
        sheetRefAtom={groupSheetRefAtom}
        snapPoints={['25%']}
      >
        <SearchGroupSheet personId={personId} />
      </BottomSheet>
      {/* <BottomSheet
        // ref={groupRef}
        sheetRefAtom={topicsSheetRefAtom}
      >
        <Text>Topics</Text>
      </BottomSheet> */}
    </>
  )
}