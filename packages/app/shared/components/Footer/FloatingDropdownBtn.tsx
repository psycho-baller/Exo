import type { FC } from 'react';
import { CheckCircle2, CircleUser, Home, Plus, Search, Settings, X } from '@tamagui/lucide-icons';
import { Link } from 'solito/link';
import { Button } from 'tamagui';

import { FloatingFooter, Page } from '@acme/ui';
import type { ButtonProps } from '@acme/ui';

import { useAddPersonStore } from '../../../stores/addQuestion';
import { AddQuestion } from './AddQuestion';

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
