import { api } from '@rooots/api/utils/trpc'
import { Text, VirtualList } from '@rooots/ui'

import { MainPage } from '../../components/Footer/MainPage'
import { useEffect } from 'react'
import { CARD_HEIGHT } from '../../utils/constants'
import { QuestionCard } from './QuestionCard'
import EmptyState from '../../components/EmptyState'

const Index = () => {
  const { isLoading, error, data } = api.question.all.useQuery()
  if (isLoading) {
    return <Text>Loading...</Text>
  }
  if (error) {
    return <Text>Error: {error.message}</Text>
  }
  const isEmpty = !data || data.length === 0;

  return (
    <MainPage>
      <VirtualList
        data={data}
        itemHeight={CARD_HEIGHT}
        renderItem={(q) => <QuestionCard question={q} />}
        listEmptyComponent={<EmptyState />}
        isPage
      />
    </MainPage>
  )
}

export default Index
