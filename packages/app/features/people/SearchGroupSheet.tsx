import type { RouterOutputs } from "@rooots/api"
import { api } from "@rooots/api/utils/trpc"
import type { UseQueryResult } from "@tanstack/react-query"
import { useAtom } from "jotai"
import { YStack, Button } from "tamagui"
import { groupSheetRefAtom } from "../../atoms/propertiesSheet"
import { groupsQueryAtom } from "../../atoms/search"
import { GroupSearchInput } from "../../components/SearchInput/other-search-inputs"
import { type GroupSearchResult, groupSchema } from "../../utils/search"
import { SearchResult } from "../search/SearchResult"

export const SearchGroupSheet = ({ personId }: { personId: number }) => {
  const [groupSheetRef] = useAtom(groupSheetRefAtom)
  const [groupQuery, setGroupQuery] = useAtom(groupsQueryAtom)
  const utils = api.useUtils()
  const { mutate: createGroupPersonRelationship } = api.groupsOfPeople.create.useMutation({
    async onSuccess() {
      await utils.person.byId.invalidate({ id: personId })
      await utils.groupsOfPeople.all.invalidate()
      await utils.groupsOfPeople.byPersonId.invalidate({ id: personId })
      setGroupQuery('')
    },
  })
  const { mutateAsync: createGroup } = api.group.create.useMutation({
    async onSuccess() {
      await utils.group.all.invalidate()
    },
  })

  const assignToGroup = (groupId: number) => {
    createGroupPersonRelationship({
      personId,
      groupId,
    })
    groupSheetRef?.current?.close()
  }

  const createNewGroup = async (input: string) => {

    const [group] = await createGroup({
      name: input,
    })
    if (group) {
      assignToGroup(group.id)
    } else {
      // add user-facing error handling here
      console.error('Failed to create group')
    }
  }

  return (
    <YStack>
      <GroupSearchInput />
      <SearchResult<GroupSearchResult, RouterOutputs['group']['all'][number]>
        useQueryResult={api.group.all.useQuery as () => UseQueryResult<RouterOutputs['group']['all']>}
        filterSchema={groupSchema}
        resultKey="groups"
        queryAtom={groupsQueryAtom}
        renderHit={(hit: GroupSearchResult) => {
          console.log('hit:', hit)
          // shared component
          return (
            <Button key={hit.document.id} onPress={() => assignToGroup(Number.parseInt(hit.document.id))}>
              {hit.document.name}
            </Button>
          )
        }}
        RenderOnEmpty={<Button onPress={() => createNewGroup(groupQuery)}>Create new group</Button>}
      />
    </YStack>
  )
}
