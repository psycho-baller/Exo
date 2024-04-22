import { api } from '@acme/api/utils/trpc'
import { Text, VirtualList } from '@acme/ui'

import { MainPage } from '../../components/Footer/MainPage'
import { CARD_HEIGHT } from '../../utils/constants'
import { GroupCard } from './GroupCard'

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
        listEmptyComponent={<Text>No data</Text>}
        isPage
      />
    </MainPage>
  )
}

export default Index
