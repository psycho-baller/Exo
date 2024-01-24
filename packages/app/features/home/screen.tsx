import { FlashList } from "@shopify/flash-list";

import { api } from "@acme/api/utils/trpc"
import { PageWithNavFooter } from "../../shared/components/Footer/PageWithNavFooter";
import QuestionCard from "./QuestionCard";


const Index = () => {
  // const { width, height } = Dimensions.get('window');
  const questionQuery = api.question.all.useQuery();

  return (
    <PageWithNavFooter>
      <FlashList
        data={questionQuery.data}
        estimatedItemSize={20}
        // ItemSeparatorComponent={() => <Separator />}
        renderItem={(p) => (
          <QuestionCard
            question={p.item}
          />
        )}
      />
    </PageWithNavFooter>
  );
};

export default Index;
