import { useEffect, useState } from 'react'

import { api } from '@acme/api/utils/trpc'
import { UnstyledInput } from '@acme/ui'

export function EditGroupText({ id, content }: { id: number; content: string }) {
  const utils = api.useUtils()
  const { mutate: updateName } = api.group.updateName.useMutation({
    async onSuccess() {
      await utils.group.all.invalidate()
    },
  })
  const [group, setGroup] = useState(content)

  // debounce the input
  useEffect(() => {
    const timer = setTimeout(() => {
      updateName({ id: id, name: content })
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [id, updateName, content])

  return (
    <UnstyledInput
      // width='full'
      placeholderTextColor='$secondaryColor'
      opacity={0.75}
      fontSize={'$8'}
      paddingVertical={'$2'}
      marginBottom={'$4'}
      placeholder='Add group'
      value={group}
      onChangeText={setGroup}
    />
  )
}
