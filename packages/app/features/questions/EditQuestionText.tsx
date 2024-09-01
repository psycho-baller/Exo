import { useEffect, useState } from 'react'

import { api } from '@acme/api/utils/trpc'
import { UnstyledInput } from '@acme/ui'

export function EditQuestionText({ id, content }: { id: number; content: string }) {
  const utils = api.useUtils()
  const { mutate: updateQuestion } = api.question.updateText.useMutation({
    async onSuccess() {
      await utils.question.all.invalidate()
      await utils.question.byId.invalidate({ id })
    },
  })
  const [question, setQuestion] = useState(content)

  // debounce the input
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     updateQuestion({ id: id, question })
  //     console.log('updated question')
  //   }, 2000)

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [question])

  return (
    <UnstyledInput
      // width='full'
      placeholderTextColor='$secondaryColor'
      multiline
      blurOnSubmit
      onBlur={() => updateQuestion({ id: id, question })}
      onSubmitEditing={() => updateQuestion({ id: id, question })}
      returnKeyType='done'
      returnKeyLabel='Done'
      fontSize={'$8'}
      padding={'$3'}
      placeholder='Add Question'
      value={question}
      onChangeText={setQuestion}
    />
  )
}
