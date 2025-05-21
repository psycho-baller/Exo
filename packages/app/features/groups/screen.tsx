import { api } from '@rooots/api/utils/trpc'
import { Text, VirtualList } from '@rooots/ui'

import { MainPage } from '../../components/Footer/MainPage'
import { CARD_HEIGHT } from '../../utils/constants'
import { GroupCard } from './GroupCard'
import GroupEmptyState from '../../components/GroupEmptyState'

const Index = () => {
  const { isLoading, error, data } = api.group.all.useQuery()

  if (isLoading) {
    return <Text>Loading...</Text>
  }
  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  // TODO: ADD YOUR FIRST QUESTION!!!
  return (
    <MainPage>
      <VirtualList
        data={data}
        itemHeight={CARD_HEIGHT}
        renderItem={(g) => <GroupCard group={g} />}
        listEmptyComponent={<GroupEmptyState />}
        isPage
      />
    </MainPage>
  )
}

export default Index
