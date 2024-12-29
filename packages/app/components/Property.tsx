import type { FC } from 'react';
import type { ViewProps } from '@rooots/ui';
import { XStack } from '@rooots/ui';

interface Props extends ViewProps {

}


export const Property: FC<Props> = ({ children, ...props }) => {

  return (
    <XStack padding='$2.5' paddingStart='$3' columnGap='$5' alignItems='center' {...props}>
      {children}
    </XStack>
  );
};