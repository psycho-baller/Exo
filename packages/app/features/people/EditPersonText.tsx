import { useEffect, useState } from 'react'

import { api } from '@rooots/api/utils/trpc'
import { UnstyledInput } from '@rooots/ui'

export function EditPersonText({ id, content }: { id: number; content: string }) {
  const utils = api.useUtils()
  const { mutate: updateName } = api.person.updateName.useMutation({
    async onSuccess() {
      await utils.person.all.invalidate()
      await utils.person.byId.invalidate({ id })
    },
  })
  const [person, setPerson] = useState(content)

  return (
    <UnstyledInput
      // width='full'
      placeholderTextColor='$secondaryColor'
      opacity={0.75}
      fontSize={'$8'}
      paddingHorizontal={'$3'}
      // paddingVertical={'$2'}
      placeholder='Add person'
      value={person}
      onChangeText={setPerson}
      onBlur={() => updateName({ id: id, firstName: person })}
      onSubmitEditing={() => updateName({ id: id, firstName: person })}
    />
  )
}
