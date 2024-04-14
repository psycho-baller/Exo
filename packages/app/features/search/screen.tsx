// Index.tsx
import React, { useEffect, useRef, useState } from 'react';

import type { RouterOutputs } from '@acme/api';
import { api } from '@acme/api/utils/trpc';
import { Button, Input, Text, YStack } from '@acme/ui';

import { getFullName, getSingularFromPlural } from '../../lib/utils/strings';
import { MainPage } from '../../shared/components/Footer/MainPage';
import LinkButton from '../../shared/components/LinkButton';
import SearchHistory from './SearchHistory';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const searchTermRef = useRef<string>(''); // This ref will store the last non-empty search term.

  const createSearchHistory = api.searchHistory.create.useMutation();

  // tRPC hooks for searching people, groups, and questions
  const peopleSearch = api.person.search.useQuery(
    { query: searchTerm },
    { enabled: searchTerm.length > 0 },
  );
  const groupSearch = api.group.search.useQuery(
    { query: searchTerm },
    { enabled: searchTerm.length > 0 },
  );
  const questionSearch = api.question.search.useQuery(
    { query: searchTerm },
    { enabled: searchTerm.length > 0 },
  );

  // Update the ref whenever searchTerm changes and is not empty
  useEffect(() => {
    if (searchTerm) {
      searchTermRef.current = searchTerm; // Only update ref if searchTerm is not empty
    }
  }, [searchTerm]);

  // Cleanup function to store the last non-empty searchTerm when component unmounts
  useEffect(() => {
    return () => {
      const lastSearchTerm = searchTermRef.current;
      if (lastSearchTerm) {
        // Only perform mutation if lastSearchTerm is not empty
        createSearchHistory.mutate({
          fromUsername: 'admin',
          query: lastSearchTerm,
        });
      }
    };
  }, []); // Dependency array is empty to ensure cleanup runs only on unmount

  // Function to render search result section
  const renderSearchSection = (slug: 'people' | 'groups' | 'questions', data: unknown) => {
    const singularSlug = getSingularFromPlural(slug);
    type SingularSlug = typeof singularSlug;
    type Data = RouterOutputs[SingularSlug]['all'];
    const dataTyped = data as Data;
    // give the data a type
    // capitalize the first letter of the slug
    const title = slug.charAt(0).toUpperCase() + slug.slice(1);

    if (searchTerm && dataTyped && dataTyped.length > 0) {
      return (
        <YStack paddingTop='$4' columnGap='$1'>
          <Text fontWeight='bold'>{title}</Text>
          {dataTyped.map((item) => (
            <LinkButton key={item.id} href={`/${slug}/${item.id}`}>
              {slug === 'people'
                ? getFullName(item.firstName, item.lastName)
                : slug === 'groups'
                  ? item.name
                  : item.question}
            </LinkButton>
          ))}
        </YStack>
      );
    } else if (searchTerm && (!dataTyped || dataTyped.length === 0)) {
      return (
        <YStack marginTop='$2'>
          <Text fontWeight='bold'>{title}</Text>
          <Text color='grey'>No results found</Text>
        </YStack>
      );
    }
    return null;
  };

  return (
    <MainPage>
      <YStack padding='$4'>
        <Input
          placeholder='Search questions, people, and groups'
          value={searchTerm}
          onChangeText={setSearchTerm}
          flex={1}
        />
        {/* Render search results */}
        <YStack paddingTop='$4' columnGap='$4'>
          {renderSearchSection('people', peopleSearch.data)}
          {renderSearchSection('groups', groupSearch.data)}
          {renderSearchSection('questions', questionSearch.data)}
        </YStack>

        <SearchHistory />
      </YStack>
    </MainPage>
  );
};

export default Index;
