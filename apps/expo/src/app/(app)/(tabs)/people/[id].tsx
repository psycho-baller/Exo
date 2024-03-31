import { SafeAreaView, Text, View } from 'react-native';
import { Stack, useGlobalSearchParams } from 'expo-router';

import { api } from '@acme/api/utils/trpc';

export default function Post() {
  const { id } = useGlobalSearchParams();
  if (!id || typeof id !== 'string') throw new Error('unreachable');
  const { data } = api.person.byId.useQuery({ id: parseInt(id) });

  if (!data) return null;

  return (
    <SafeAreaView>
      <View>
        <Text>{data.createdDatetime?.toString()}</Text>
        <Text>{data.id}</Text>
      </View>
    </SafeAreaView>
  );
}
