import { SafeAreaView, Text, View } from 'react-native';
import { Stack, useGlobalSearchParams } from 'expo-router';

import { api } from '@acme/api/utils/trpc';

export default function Post() {
  const { id } = useGlobalSearchParams();
  if (!id || typeof id !== 'string') throw new Error('unreachable');
  const { data } = api.question.byId.useQuery({ id: parseInt(id) });

  if (!data) return null;

  return (
    <SafeAreaView className='bg-[#0D23FF]'>
      <Stack.Screen options={{ title: data.question }} />
      <View className='h-full w-full p-4'>
        <Text className='py-2 text-3xl font-bold text-white'>
          {data.createdDatetime?.toString()}
        </Text>
        <Text className='py-4 text-white'>{data.id}</Text>
      </View>
    </SafeAreaView>
  );
}
