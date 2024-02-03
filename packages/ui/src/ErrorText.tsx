import { Text } from 'tamagui';
import type { GetProps } from 'tamagui';

type Props = GetProps<typeof Text>;

export const ErrorText = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Text color={'$red8'} {...rest}>
      {children}
    </Text>
  );
};
