import { Text} from "tamagui";
import type { GetProps } from "tamagui"

interface Props extends GetProps<typeof Text> {
  
}

export const ErrorText = (props: Props) => {
  const { children, ...rest } = props;
  return (
    <Text color={"$red8"} {...rest}>
      {children}
    </Text>
  );
}
