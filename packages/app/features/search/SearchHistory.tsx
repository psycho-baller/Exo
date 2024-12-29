import React, { useEffect, useState } from 'react'

import { api } from '@rooots/api/utils/trpc'
import { Text, YStack } from '@rooots/ui'

const SearchHistory = () => {
  // Use the TRPC query hook, with query execution dependent on the session being loaded
  const { data, isLoading, isError } = api.searchHistory.byCurrentUserId.useQuery()

  // Render handling for different states
  if (isLoading) {
    return <Text>Loading search history...</Text> // Show while session is not yet loaded
  }

  if (isError) {
    return <Text>Unable to load data. Please check your session and network connection.</Text>
  }

  return (
    <YStack>
      {data && data.length > 0 ? (
        data.map((item, index) => <Text key={index}>{item.query}</Text>)
      ) : (
        <Text>No history found.</Text>
      )}
    </YStack>
  )
}

export default SearchHistory
