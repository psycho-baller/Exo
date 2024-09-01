import { useEffect, useState } from 'react'

import { api } from '@acme/api/utils/trpc'
import { UnstyledInput } from '@acme/ui'

export function EditGroupText({ id, content }: { id: number; content: string }) {
  const utils = api.useUtils()
  const { mutate: updateName } = api.group.updateName.useMutation({
    async onSuccess() {
      await utils.group.all.invalidate()
      await utils.group.byId.invalidate({ id })
    },
  })
  const [group, setGroup] = useState(content)

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
      onBlur={() => updateName({ id: id, name: group })}
      onSubmitEditing={() => updateName({ id: id, name: group })}
    />
  )
}
