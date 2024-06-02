import { api } from '@acme/api/utils/trpc'
import { Text, VirtualList } from '@acme/ui'

import { MainPage } from '../../components/Footer/MainPage'
import { useEffect } from 'react'
import { CARD_HEIGHT } from '../../utils/constants'
import { QuestionCard } from './QuestionCard'

const Index = () => {
  const { isLoading, error, data } = api.question.all.useQuery()
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
        renderItem={(q) => <QuestionCard question={q} />}
        listEmptyComponent={<Text>No data</Text>}
        isPage
      />
    </MainPage>
  )
}

export default Index
