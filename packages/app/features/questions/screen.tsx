import { api } from '@acme/api/utils/trpc'
import { Text, VirtualList } from '@acme/ui'

import { MainPage } from '../../components/Footer/MainPage'
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
        itemHeight={20}
        renderItem={(q) => <QuestionCard question={q} />}
        listEmptyComponent={<Text>No data</Text>}
      />
    </MainPage>
  )
}

export default Index
