import { useEffect, useState } from 'react'

import { api } from '@acme/api/utils/trpc'
import { UnstyledInput } from '@acme/ui'

export function EditQuestionText({ id, content }: { id: number; content: string }) {
  const utils = api.useUtils()
  const { mutate: updateQuestion } = api.question.updateText.useMutation({
    async onSuccess() {
      await utils.question.all.invalidate()
    },
  })
  const [question, setQuestion] = useState(content)

  // debounce the input
  useEffect(() => {
    const timer = setTimeout(() => {
      updateQuestion({ id: id, question })
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [question])

  return (
    <UnstyledInput
      // width='full'
      placeholderTextColor='$secondaryColor'
      opacity={0.75}
      fontSize={'$8'}
      paddingVertical={'$2'}
      marginBottom={'$4'}
      placeholder='Add Question'
      value={question}
      onChangeText={setQuestion}
    />
  )
}
