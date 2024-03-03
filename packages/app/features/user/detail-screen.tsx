'use client';

import React from 'react';
import { ChevronLeft } from '@tamagui/lucide-icons';
import { createParam } from 'solito';
import { useLink } from 'solito/navigation';

import { Button, Paragraph, YStack } from '@acme/ui';

const { useParam } = createParam<{ id: string }>();

export function UserDetailScreen() {
  const [id] = useParam('id');
  const link = useLink({
    href: '/',
  });

  return (
    <YStack flex={1} justifyContent='center' alignItems='center' gap>
      <Paragraph textAlign='center' fow='700'>{`User ID: ${id}`}</Paragraph>
      <Button {...link} icon={ChevronLeft}>
        Go Home
      </Button>
    </YStack>
  );
}
