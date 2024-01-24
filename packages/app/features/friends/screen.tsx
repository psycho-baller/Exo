import type { ComponentPropsWithoutRef, FC } from 'react';
import { PageWithNavFooter } from '../../shared/components/Footer/PageWithNavFooter';
import { api } from "@acme/api/utils/trpc"
import { FlashList } from "@shopify/flash-list";
import FriendCard from './FriendCard';
interface Props extends ComponentPropsWithoutRef<"div"> {

}


const Component: FC<Props> = (props) => {
  const { } = props;
  const utils = api.useUtils();

  const friendQuery = api.friend.all.useQuery();

  const deleteQuestionMutation = api.question.delete.useMutation({
    onSettled: () => utils.question.all.invalidate(),
  });

  return (
    <PageWithNavFooter>
      <FlashList
        data={friendQuery.data}
        estimatedItemSize={20}
        // ItemSeparatorComponent={() => <Separator />}
        renderItem={(p) => (
          <FriendCard
            friend={p.item}
            onDelete={() => deleteQuestionMutation.mutate(p.item.id)}
          />
          // <Text>{p.item.text}</Text>
        )}
      />
    </PageWithNavFooter>
  );
};

export default Component;
