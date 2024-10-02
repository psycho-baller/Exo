import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'
import { BleManager, type Device } from 'react-native-ble-plx'
import { storage } from '../provider/kv'
import { proximityDetectionEnabledKey, useProximityDetectionEnabled } from '../atoms/ble'
import { requestPermissions } from './permissions'
import { sendLocalNotification } from '../hooks/usePushNotifications'
import { AppState } from 'react-native'

const BACKGROUND_FETCH_TASK = 'background-ble-scan'

const bleManager = new BleManager()
// const [isEnabled, setEnabled] = useProximityDetectionEnabled()

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  console.log(
    'Running background BLE scan',
    // await storage.getString(proximityDetectionEnabledKey),
  )
  const isEnabled = true //JSON.parse((await storage.getString(proximityDetectionEnabledKey)) || 'true')
  console.log('Background BLE scan enabled:', isEnabled)
  if (!isEnabled) {
    return BackgroundFetch.BackgroundFetchResult.NoData
  }
  sendLocalNotification('Background BLE scan', 'Found')
  try {
    const devices = await scanForDevices()
    console.log('Found devices:', devices)
    sendLocalNotification(
      'Background BLE scan',
      `Found ${devices.length} devices, ${devices.map((d) => d.name).join(', ')}, ${devices.map(
        (d) => d.id,
      )}`,
    )
    // Process the found devices (e.g., store in local storage, send to server, etc.)
    return BackgroundFetch.BackgroundFetchResult.NewData
  } catch (error) {
    console.error('Background BLE scan failed:', error)
    return BackgroundFetch.BackgroundFetchResult.Failed
  }
})

async function scanForDevices(): Promise<Device[]> {
  console.log('requestingg potato')
  const permissionsGranted = await requestPermissions()
  console.log('permissionsGranted:', permissionsGranted)
  if (!permissionsGranted) {
    console.log('Bluetooth permissions not granted')
    throw new Error('Bluetooth permissions not granted')
  }

  const devices: Device[] = []
  const scanDuration = 10000 // 10 seconds

  console.log('Starting device scan...')
  bleManager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      console.error('Error scanning for devices:', error)
      return
    }
    if (device) {
      devices.push(device)
    }

    console.log('Scanning for devices...', devices)
    // Stop scanning after 10 seconds
    // setTimeout(() => {
    console.log('Stopping device scan...')
    bleManager.stopDeviceScan()
    console.log('Stopped device scan...')
    // resolve(devices)

    // }, 10000)
  })
  return devices
}

export async function registerBackgroundFetch() {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60, // 15 minutes in seconds
      stopOnTerminate: false,
      startOnBoot: true,
    })
    console.log('Background fetch registered')
    BackgroundFetch.getStatusAsync().then((status) => {
      console.log('Background fetch status:', status)
    })

    // Manually trigger the task once to ensure it's working
    // await BackgroundFetch.scheduleTaskAsync(BACKGROUND_FETCH_TASK)
  } catch (err) {
    console.error('Background fetch failed to register:', err)
  }
}

export async function unregisterBackgroundFetch() {
  try {
    await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK)
    console.log('Background fetch unregistered')
  } catch (err) {
    console.error('Background fetch failed to unregister:', err)
  }
}

// Function to check if the background fetch is registered
export async function isBackgroundFetchRegistered() {
  const status = await BackgroundFetch.getStatusAsync()
  console.log('Background fetch status:', status)
  return status === BackgroundFetch.BackgroundFetchStatus.Available
}

// Add this to your app's main component or where you initialize your app
export function initializeBackgroundFetch() {
  console.log('Initializing background fetch')
  registerBackgroundFetch()

  // Listen for app state changes
  AppState.addEventListener('change', async (nextAppState) => {
    console.log('App state changed:', nextAppState)
    if (nextAppState === 'active') {
      // App has come to the foreground
      const isRegistered = await isBackgroundFetchRegistered()
      console.log('Background fetch is registered:', isRegistered)
      if (!isRegistered) {
        await registerBackgroundFetch()
      }
    }
  })
}
