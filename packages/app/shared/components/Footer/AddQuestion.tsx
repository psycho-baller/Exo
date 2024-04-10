import { useEffect, useState } from 'react';
import { CheckCircle2, X } from '@tamagui/lucide-icons';
import { Button, Label, Sheet, XStack } from 'tamagui';

import { api } from '@acme/api/utils/trpc';
import { ErrorText, UnstyledInput } from '@acme/ui';

import { useAddPersonStore } from '../../../stores/addQuestion';
import { AddPerson } from './AddPerson';

export const AddQuestion = () => {
  const utils = api.useUtils();

  const [
    selectedPerson,
    setSelectedPerson,
    personSearch,
    setPersonSearch,
    dropdownOpen,
    setDropdownOpen,
  ] = useAddPersonStore((state) => [
    state.selectedPerson,
    state.setSelectedPerson,
    state.personSearch,
    state.setPersonSearch,
    state.dropdownOpen,
    state.setDropdownOpen,
  ]);

  const [question, setQuestion] = useState('');
  const [mounted, setMounted] = useState(false);

  const { mutate, error } = api.question.create.useMutation({
    async onSuccess() {
      setQuestion('');
      setDropdownOpen(false);
      setPersonSearch('');
      await utils.question.all.invalidate();
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  function addQuestion() {
    mutate({
      createdByUsername: 'seeded_user_901',
      personId: selectedPerson?.id,
      question,
    });
  }

  return (
    <Sheet open={dropdownOpen} modal onOpenChange={setDropdownOpen} zIndex={50}>
      {/* <Sheet.Overlay
        animation='lazy'
        // enterStyle={{ opacity: 0.75 }}
        // exitStyle={{ opacity: 0.75 }}
      /> */}
      <Sheet.Handle />
      <Sheet.Frame padding='$4'>
        <XStack justifyContent='space-between'>
          <Label fontSize={'$1'} unstyled color='$secondaryColor' htmlFor='question'>
            QUESTION
          </Label>
          <Button unstyled onPress={() => setDropdownOpen(false)}>
            <X />
          </Button>
        </XStack>
        <UnstyledInput
          width={200}
          placeholderTextColor='$secondaryColor'
          opacity={0.75}
          fontSize={'$8'}
          paddingVertical={'$2'}
          // style={
          //   mounted
          //     ? {
          //         transform: [
          //           {
          //             translateY: 0,
          //           },
          //         ],
          //       }
          //     : {
          //         transform: [
          //           {
          //             translateY: 100,
          //           },
          //         ],
          //       }
          // }
          autoFocus={dropdownOpen}
          placeholder='Add Question'
          value={question}
          onChangeText={setQuestion}
        />
        <XStack>
          <AddPerson flex={1} />
          <Button justifyContent='flex-end' unstyled onPress={addQuestion}>
            <CheckCircle2 />
          </Button>
        </XStack>
        {/* <XStack justifyContent="space-between">
          <XStack>

          </XStack>
          
        </XStack> */}
        {error?.data?.code === 'UNAUTHORIZED' && (
          <ErrorText textAlign='center'>You need to be logged in to create a question</ErrorText>
        )}
        {error?.data?.zodError?.fieldErrors.text && (
          <ErrorText textAlign='center'>{error.data.zodError.fieldErrors.text}</ErrorText>
        )}
      </Sheet.Frame>
    </Sheet>
  );
};
