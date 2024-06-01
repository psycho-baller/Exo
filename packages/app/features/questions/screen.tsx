import { api } from '@acme/api/utils/trpc'
import { Text, VirtualList } from '@acme/ui'

import { MainPage } from '../../components/Footer/MainPage'
import { useEffect } from 'react'
// import { CARD_HEIGHT } from '../../utils/constants'
// import { QuestionCard } from './QuestionCard'

const Index = () => {
  console.log('api:', api)
  const { mutateAsync } = api.question.create.useMutation({
    async onSuccess() {
      // await api.question.all.invalidate()
    },
  })

  const { isLoading, error, data } = api.question.all.useQuery()
  console.log('data:', data)
  if (isLoading) {
    return <Text>Loading...</Text>
  }
  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  useEffect(() => {
    const createQuestion = async () => {
      const newQuestion = await mutateAsync({
        question: 'What is the meaning of life?',
        createdByUserId: '69420'
      })
      console.log('newQuestion:', newQuestion)
    }
    createQuestion()
  }, [])

  return (
    <MainPage>
      {/* <VirtualList
        data={data}
        itemHeight={CARD_HEIGHT}
        renderItem={(q) => <QuestionCard question={q} />}
        listEmptyComponent={<Text>No data</Text>}
        isPage
      /> */}
    </MainPage>
  )
}

export default Index
