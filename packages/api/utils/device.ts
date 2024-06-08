import { getAndroidId, getIosIdForVendorAsync } from 'expo-application'
import { Platform } from 'react-native'

export async function getDeviceId() {
  const deviceId = Platform.OS === 'android' ? getAndroidId() : await getIosIdForVendorAsync()
  return deviceId ?? 'unknown'
}
