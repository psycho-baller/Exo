import type { FC } from 'react';
import { Plus} from '@tamagui/lucide-icons';
import { Button } from 'tamagui';
import type { ButtonProps } from '@acme/ui';

import { useAddPersonStore } from '../../../stores/addQuestion';

type Props = ButtonProps;

export const FloatingDropdownBtn: FC<ButtonProps> = () => {
  const [setDropdownOpen] = useAddPersonStore((state) => [state.setDropdownOpen]);

  function handlePlusClick() {
    setDropdownOpen(true);
  }

  return (
    <>
      <Button
        unstyled
        position='absolute'
        zIndex={10}
        right={20}
        bottom={20}
        onPress={handlePlusClick}
        icon={<Plus size={'$2.5'} />}
      />
    </>
  );
};
