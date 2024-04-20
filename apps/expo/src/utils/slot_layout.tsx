import { Slot } from 'expo-router';
import type { ComponentPropsWithoutRef, FC } from 'react';

interface Props extends ComponentPropsWithoutRef<'div'> {}

const Component: FC<Props> = (props) => {
  const {} = props;

  return <Slot />;
};

export default Component;
