import * as BackgroundFetch from 'expo-background-fetch'
import * as TaskManager from 'expo-task-manager'
import { type BleError, BleManager, type Device, State } from 'react-native-ble-plx'
import { storage } from '../provider/kv'
import { proximityDetectionEnabledKey } from '../atoms/ble'
import { requestPermissions } from './permissions'
import { sendLocalNotification } from '../hooks/usePushNotifications'
import { AppState, Platform } from 'react-native'
import { broadcast, setCompanyId, stopBroadcast } from 'react-native-ble-advertise';
import { getAndroidId, getIosIdForVendorAsync } from 'expo-application'
import { BACKGROUND_BLE_TASK, RETRY_INTERVAL, SCAN_TIMEOUT } from './constants'

const bleManager = new BleManager()

const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
  devices.findIndex((device) => nextDevice.id === device.id) > -1
const alreadyFound = (arr: Device[], device: Device) => arr.find((d) => d.id === device.id)
const handleScanError = (error: BleError) => {
  console.error('BLE Scan Error:', error)
  console.error('Error Code:', error.errorCode)
  console.error('Error Message:', error.message)
  console.error('Error Reason:', error.reason)
  sendLocalNotification('BLE Scan Error', `${error.message}. Retrying in 1 minute.`)

  if (error.errorCode === 600) {
    // Schedule a retry after RETRY_INTERVAL
    setTimeout(async () => {
      const friendDeviceIds: number[] = [] //await getFriendDeviceIds()
      const devices = await scanForDevices(friendDeviceIds)
    }, RETRY_INTERVAL)
  }
}
const requestBLEPermissions = async () => {
  const permissionsGranted = await requestPermissions()
  if (!permissionsGranted) {
    return false
  }
  return true
}

TaskManager.defineTask(BACKGROUND_BLE_TASK, async () => {
  try {
    console.log('Starting background BLE scan')
    const friendDeviceIds: number[] = [] //await getFriendDeviceIds()
    const scanResults = await scanForDevices(friendDeviceIds)
    const devices = scanResults.filter((d) => d.id)

    console.log('Found devices:', devices)
    sendLocalNotification(
      'Background BLE scan',
      `Found ${devices.length} devices: ${devices.map((d) => d.name || 'Unknown').join(', ')}`,
    )
    // const myDevice = devices.find((d) => d.name === 'Muter')
    const devicesWithNames = devices.filter((d) => d.name || d.localName)

    for (const d of devicesWithNames) {
      console.info(
        'Device:',
        `Found device: ${d.id}
      name: ${d.name}
      localName: ${d.localName}
      rssi: ${d.rssi}
      serviceUUIDs: ${d.serviceUUIDs}
      manufacturerData: ${d.manufacturerData}
      serviceData: ${d.serviceData}
      mtu: ${d.mtu}
      txPowerLevel: ${d.txPowerLevel}
      isConnectable: ${d.isConnectable}
      solicitedServiceUUIDs: ${d.solicitedServiceUUIDs}
      overflowServiceUUIDs: ${d.overflowServiceUUIDs}`,
      )
    }


    // Process the found devices (e.g., store in local storage, send to server, etc.)
    return BackgroundFetch.BackgroundFetchResult.NewData
  } catch (error) {
    console.error('Background BLE scan failed:', error)
    return BackgroundFetch.BackgroundFetchResult.Failed
  }
})

async function scanForDevices(friendDeviceIds: number[]): Promise<Device[]> {
  const permissionsGranted = await requestPermissions()
  if (!permissionsGranted) {
    throw new Error('Bluetooth permissions not granted')
  }
  const devices: Device[] = []
  let isScanning = false
  try {
    if (Platform.OS === 'android') {
      const state = await bleManager.state()
      if (state !== State.PoweredOn) {
        sendLocalNotification('BLE Error', `Bluetooth is not powered on. Current state: ${state}`)
        return devices
      }
    }
    isScanning = true

    return new Promise<Device[]>((resolve) => {
      bleManager.startDeviceScan(
        null,
        {
          // legacyScan: false,
          // scanMode: ScanMode.LowLatency,
        },
        (error, device) => {
          if (error) {
            handleScanError(error)
            isScanning = false
            resolve(devices)
            return
          }
          if (device && !isDuplicateDevice(devices, device) && !alreadyFound(devices, device)) {
            devices.push(device)
            // setScannedDevices((prevDevices) => [...prevDevices, device])
          }
          // if (device) {
          //   setScannedDevices((prevState: Device[]) => {
          //     if (!isDuplicateDevice(prevState, device) && !alreadyFound) {
          //       return [...prevState, device]
          //     }
          //     return prevState
          //   })
          // }
        },
      )

      // Stop scan after SCAN_TIMEOUT
      setTimeout(() => {
        if (isScanning) {
          bleManager.stopDeviceScan()
          isScanning = false
          console.log('Scan completed. Found devices:', devices.length)
          resolve(devices)
        }
      }, SCAN_TIMEOUT)
    })
  } catch (error) {
    console.error('Error starting BLE scan:', error)
    sendLocalNotification('BLE Error', `Failed to start BLE scan: ${error}`)
    return devices
  }
}

export async function registerBackgroundBleTask() {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_BLE_TASK, {
      minimumInterval: 60,
      stopOnTerminate: false,
      startOnBoot: true,
    })
    console.log('Background BLE task registered')
  } catch (err) {
    console.error('Background BLE task failed to register:', err)
  }
}

export async function unregisterBackgroundBleTask() {
  try {
    await TaskManager.unregisterTaskAsync(BACKGROUND_BLE_TASK)
    console.log('Background BLE task unregistered')
  } catch (err) {
    console.error('Background BLE task failed to unregister:', err)
  }
}

export async function isBackgroundBleTaskRegistered() {
  return await TaskManager.isTaskRegisteredAsync(BACKGROUND_BLE_TASK)
}

export function initializeBackgroundBleTask() {
  console.log('Initializing background BLE task')
  const permissionsGranted = requestBLEPermissions()
  const isEnabled = true // JSON.parse((await storage.getString(proximityDetectionEnabledKey)) || 'true')
  if (!isEnabled) return
  if (!permissionsGranted) {
    alert('Bluetooth permissions are required to use this feature')
  }
  registerBackgroundBleTask()
  AppState.addEventListener('change', async (nextAppState) => {
    console.log('App state changed:', nextAppState)
    if (nextAppState === 'active') {
      const isRegistered = await isBackgroundBleTaskRegistered()
      console.log('Background BLE task is registered:', isRegistered)
      if (!isRegistered) {
        await registerBackgroundBleTask()
      }
    }
  })
}

export const startAdvertisingHelper = async (UUID: string, MAJOR: number, MINOR: number, COMPANY_ID: number) => {
  setCompanyId(COMPANY_ID);
  console.info('Starting advertising with UUID:', UUID);
  broadcast(UUID, MAJOR, MINOR).catch((error) => {
    console.error('Error starting advertising:', error);
    console.info('Error starting advertising:', error);
    console.log(error);
  });
};

export const stopAdvertising = async () => {
  try {
    await stopBroadcast()
    console.info('Stopped advertising')
  } catch (error) {
    console.error('Error stopping advertising:', error)
  }
};

export async function getDeviceId() {
  const deviceId = Platform.OS === 'android' ? getAndroidId() : await getIosIdForVendorAsync()
  return deviceId ?? 'unknown'
}

export const filterDevices = (devices: Device[]) => {
  return devices.filter((d) => d.id && d.manufacturerData && d.manufacturerData.length > 0)
}