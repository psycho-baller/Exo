import type { FC } from 'react';
import type { InputProps, ViewProps } from '@acme/ui';
import { MyInput, UnstyledInput, View } from '@acme/ui';

interface Props extends InputProps {

}


export const SearchInput: FC<Props> = ({
  size = '$4',
  ...rest
}) => {

  return (
    <UnstyledInput
      size={size}
      minWidth="100%"
      placeholderTextColor={'$secondaryColor'}
      placeholder='Search'
      {...rest}
    />
  );
};