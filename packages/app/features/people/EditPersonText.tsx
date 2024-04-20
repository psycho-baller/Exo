import { useEffect, useState } from 'react';

import { api } from '@acme/api/utils/trpc';
import { UnstyledInput } from '@acme/ui';

export function EditPersonText({ id, content }: { id: number; content: string }) {
  const utils = api.useUtils();
  const { mutate: updatePerson } = api.person.updatePerson.useMutation({
    async onSuccess() {
      await utils.person.all.invalidate();
    },
  });
  const [person, setPerson] = useState(content);

  // debounce the input
  useEffect(() => {
    const [firstName, lastName] = person.split(' ', 2);
    if (!firstName) return;
    const timer = setTimeout(() => {
      updatePerson({ id: id, firstName: firstName, lastName: lastName });
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [id, person, updatePerson]);

  return (
    <UnstyledInput
      // width='full'
      placeholderTextColor='$secondaryColor'
      opacity={0.75}
      fontSize={'$8'}
      paddingVertical={'$2'}
      marginBottom={`$4`}
      placeholder='Add person'
      value={person}
      onChangeText={setPerson}
    />
  );
}
