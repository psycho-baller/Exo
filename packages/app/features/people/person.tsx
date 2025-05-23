import { FlashList } from '@shopify/flash-list'
import { ArrowLeft, Home, Plus, Search, User, Users } from '@tamagui/lucide-icons'
import type { ReactNode } from 'react'
import { Platform } from 'react-native'
import { useLink, useParams } from 'solito/navigation'
import { Link } from 'solito/link'

import { api } from '@rooots/api/utils/trpc'
import { Button, FloatingFooter, Page, Separator, Spacer, Text, VirtualList, YStack } from '@rooots/ui'

import { CARD_HEIGHT } from '../../utils/constants'
import { getFullName } from '../../utils/strings'
import { QuestionCard } from '../questions/QuestionCard'
import { EditPersonText } from './EditPersonText'
import { PersonProperties } from './PersonProperties'
import { useAtom } from 'jotai'
import { questionDataAtom, sampleQuestion, sheetRefAtom } from '../../atoms/addQuestion'

interface Params {
  id: string
  [key: string]: string
}

const PersonScreen = (): ReactNode => {
  const { id } = useParams<Params>()
  const [sheetRef] = useAtom(sheetRefAtom)
  const [questionData, setQuestionData] = useAtom(questionDataAtom)
  const handlePresentModalPress = () => {
    setQuestionData({ ...sampleQuestion, personId: Number.parseInt(id) })
    sheetRef?.current?.present()
  }

  const link = useLink({
    href: '/people',
  })
  const { data } = api.person.byId.useQuery({ id: Number.parseInt(id) })
  if (!data) return null

  return (
    <Page animation='bouncy'
      paddingHorizontal='$2'
      paddingVertical='$2'>
      {/* <XStack gap={18}>
        <Button iconAfter={Trash2} size='$3' width='5%' variant='outlined'>
        </Button>
      </XStack> */}

      {/* <Label htmlFor='question' /> */}
      {Platform.OS === 'web' && (
        <Button {...link} icon={ArrowLeft} size='$3' variant='outlined'>
          Back
        </Button>
      )}
      <EditPersonText id={data.id} content={getFullName(data.firstName, data.lastName)} />
      <FloatingFooter blurIntensity={100} onPress={handlePresentModalPress}>
        <Text fontSize='$6' >
          Add Question for {data.firstName}
        </Text>
      </FloatingFooter>
      <PersonProperties {...data} />
      <Separator marginTop='$3' />
      <QuestionsForPerson personId={data.id} />
    </Page>
  )
}

const QuestionsForPerson = ({ personId }: { personId: number }) => {
  const { data } = api.question.getQuestionsForPerson.useQuery({ id: personId })
  console.log(data)
  return (
    <YStack flex={1}>
      <VirtualList
        data={data}
        itemHeight={CARD_HEIGHT}
        renderItem={(q) => <QuestionCard question={q} />}
      />
    </YStack>
  )
}
export default PersonScreen
