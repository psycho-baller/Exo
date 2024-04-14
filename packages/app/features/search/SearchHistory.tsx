import React, { useEffect, useState } from 'react';

import { api } from '@acme/api/utils/trpc';
import { Button, Text, YStack } from '@acme/ui';

const SearchHistory = () => {
  const { data } = api.searchHistory.byUsername.useQuery({ username: 'admin' });
  const [history, setHistory] = useState(data);
  const deleteHistory = api.searchHistory.delete.useMutation();

  // Update local state whenever the data changes
  useEffect(() => {
    setHistory(data);
  }, [data]);

  const handleClearHistory = () => {
    deleteHistory.mutate({ username: 'admin' });
    setHistory([]);
  };

  if (!history || history.length === 0) {
    return (
      <YStack paddingTop='$4' gap='$2'>
        <Text fontWeight='bold'>Search History</Text>
        <Text>No search history found.</Text>
      </YStack>
    );
  }

  return (
    <YStack paddingTop='$4' gap='$2'>
      <Text fontWeight='bold'>Search History</Text>
      {history.map((item) => (
        <Button key={item.datetime?.getMilliseconds()} paddingVertical='$2'>
          {item.query}
        </Button>
      ))}
      <Button onPress={handleClearHistory}>
        Clear search history
      </Button>
    </YStack>
  );
};

export default SearchHistory;
