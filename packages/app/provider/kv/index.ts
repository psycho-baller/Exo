import AsyncStorage, { type AsyncStorageStatic } from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { MMKV } from 'react-native-mmkv'

type CustomAsyncStorage = AsyncStorageStatic & {
  getString: (key: string) => Promise<string | null>
  set: (key: string, value: string) => Promise<void>
}

let storage: CustomAsyncStorage | MMKV

if (Constants.appOwnership === 'expo') {
  // We are in Expo Go, use AsyncStorage
  storage = AsyncStorage as CustomAsyncStorage
  storage.getString = async (key: string) => {
    const value = await AsyncStorage.getItem(key)
    return value
  }
  storage.set = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value)
  }

  // storage.clear();
} else {
  // We are in a standalone app, use MMKV
  storage = new MMKV()
}

export { storage }
