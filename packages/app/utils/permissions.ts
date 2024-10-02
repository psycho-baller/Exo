import * as ExpoDevice from 'expo-device'
import { PermissionsAndroid, Platform } from 'react-native'
import * as Device from 'expo-device'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'

const requestAndroid31Permissions = async () => {
  const bluetoothScanPermission = await PermissionsAndroid.request(
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN!,
    {
      title: 'Location Permission',
      message: 'Bluetooth Low Energy requires Location',
      buttonPositive: 'OK',
    },
  )
  const bluetoothConnectPermission = await PermissionsAndroid.request(
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT!,
    {
      title: 'Location Permission',
      message: 'Bluetooth Low Energy requires Location',
      buttonPositive: 'OK',
    },
  )
  const fineLocationPermission = await PermissionsAndroid.request(
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION!,
    {
      title: 'Location Permission',
      message: 'Bluetooth Low Energy requires Location',
      buttonPositive: 'OK',
    },
  )
  const backgroundLocationPermission = await PermissionsAndroid.request(
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION!,
    {
      title: 'Location Permission',
      message: 'Bluetooth Low Energy requires Location',
      buttonPositive: 'OK',
    },
  )
  return (
    bluetoothScanPermission === 'granted' &&
    bluetoothConnectPermission === 'granted' &&
    fineLocationPermission === 'granted' &&
    backgroundLocationPermission === 'granted'
  )
}
export const requestPermissions = async () => {
  if (Platform.OS === 'android') {
    if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
      const granted = await PermissionsAndroid.request(
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION!,
        {
          title: 'Location Permission',
          message: 'Bluetooth Low Energy requires Location',
          buttonPositive: 'OK',
        },
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED
    }
    const isAndroid31PermissionsGranted = await requestAndroid31Permissions()

    return isAndroid31PermissionsGranted
  }
  if (ExpoDevice.osName === 'iOS') {
    // iOS handles permissions differently, usually when you first try to use Bluetooth
    return true
  }
  return true
}

export async function registerForPushNotificationsAsync() {
  let token: Notifications.ExpoPushToken | undefined
  if (Device.isDevice) {
    const notificationPermissionGranted = await requestNotificationPermissions()

    if (!notificationPermissionGranted) {
      console.log('No notification permission')
      return token
    }

    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig?.extra?.eas.projectId,
    })
  } else {
    console.warn('Must be using a physical device for Push notifications')
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return token
}

// Function to request notification permissions
export const requestNotificationPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!')
    return false
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    })
  }

  return true
}
