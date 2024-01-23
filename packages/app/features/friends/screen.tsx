import type { ComponentPropsWithoutRef, FC } from 'react';
import { PageWithNavFooter } from '../../shared/components/Footer/PageWithNavFooter';
import { Text } from '@acme/ui';
interface Props extends ComponentPropsWithoutRef<"div"> {

}


const Component: FC<Props> = (props) => {
  const { } = props;

  return (
    <PageWithNavFooter>
      <Text>Component</Text>
    </PageWithNavFooter>
  );
};

export default Component;
