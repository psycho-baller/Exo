import { type ComponentPropsWithoutRef, type FC } from 'react';
import { Redirect } from 'expo-router';

// If I wanna have an AuthProvider instead: https://github.com/fredrikburmester/expo-router-3-tab-example-with-auth/blob/main/context/AuthProvider.tsx
interface Props extends ComponentPropsWithoutRef<'div'> {}

const Component: FC<Props> = (props) => {
  const {} = props;

  return <Redirect href='/(app)/(tabs)/questions' />;
};

export default Component;
