import { api } from '@acme/api/utils/trpc'
import { Text, VirtualList } from '@acme/ui'

import { MainPage } from '../../components/Footer/MainPage'
import { PersonCard } from './PersonCard'
import { CARD_HEIGHT } from '../../utils/constants'

const Component = () => {
  const { isLoading, error, data } = api.person.all.useQuery()

  if (isLoading) {
    return <Text>Loading...</Text>
  }
  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  return (
    <MainPage>
      <VirtualList
        data={data}
        itemHeight={CARD_HEIGHT}
        renderItem={(p) => <PersonCard person={p} />}
        listEmptyComponent={<Text>No data</Text>}
        isPage
      />
    </MainPage>
  )
}

export default Component
