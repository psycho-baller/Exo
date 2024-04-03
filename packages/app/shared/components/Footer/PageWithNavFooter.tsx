import type { FC } from 'react';
import { CheckCircle2, CircleUser, Home, Plus, Search, Settings, X } from '@tamagui/lucide-icons';
import { Link } from 'solito/link';
import { Button } from 'tamagui';

import { FloatingFooter, Page } from '@acme/ui';
import type { PageProps } from '@acme/ui';

import { useAddPersonStore } from '../../../stores/addQuestion';
import { AddQuestion } from './../Footer/AddQuestion';

type Props = PageProps;

export const PageWithNavFooter: FC<Props> = ({ children }) => {
  const [setDropdownOpen] = useAddPersonStore((state) => [state.setDropdownOpen]);

  function handlePlusClick() {
    setDropdownOpen(true);
  }

  return (
    <Page>
      {children}
      {/* <FloatingFooter blurIntensity={40}>
        <Link href='/'>
          <Home size={'$2'} />
        </Link>
        <Link href='/people'>
          <CircleUser size={'$2'} />
        </Link>
        <Button unstyled onPress={handlePlusClick} icon={<Plus size={'$2.5'} />} />
        <Search size={'$2'} />
        <Settings size={'$2'} />
      </FloatingFooter>
      <AddQuestion /> */}
    </Page>
  );
};
