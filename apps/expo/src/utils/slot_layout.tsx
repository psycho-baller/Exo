import type { ComponentPropsWithoutRef, FC } from 'react';
import { Slot } from 'expo-router';

interface Props extends ComponentPropsWithoutRef<'div'> {}

const Component: FC<Props> = (props) => {
  const {} = props;

  return <Slot />;
};

export default Component;
