import { api } from '@rooots/api/utils/trpc'
import { Text, VirtualList } from '@rooots/ui'

import { MainPage } from '../../components/Footer/MainPage'
import { CARD_HEIGHT } from '../../utils/constants'
import { PersonCard } from './PersonCard'
import PersonEmptyState from '../../components/PersonEmptyState'

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
        listEmptyComponent={<PersonEmptyState />}
        isPage
      />
    </MainPage>
  )
}

export default Component
