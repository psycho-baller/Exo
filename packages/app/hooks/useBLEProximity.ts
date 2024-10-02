import { useEffect, useMemo, useState } from 'react'
import { BleManager, type Device, State } from 'react-native-ble-plx'
import { PermissionsAndroid, Platform } from 'react-native'
import { requestPermissions } from '../utils/permissions'
import { sendLocalNotification } from './usePushNotifications'
// import { useProximityDetectionEnabled } from '../atoms/ble'
import { registerBackgroundFetch, unregisterBackgroundFetch } from '../utils/backgroundBle'

const useBLEProximity = () => {
  const [scannedDevices, setScannedDevices] = useState<Device[]>([])
  const [followedIDs, setFollowedIDs] = useState<string[]>([])
  const bleManager = useMemo(() => new BleManager(), [])
  // const [isEnabled, setEnabled] = useProximityDetectionEnabled()
  const isEnabled = true
  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1

  const scanForPeripherals = async () => {
    try {
      // await bleManager.enable() // This will prompt the user to enable Bluetooth if it's not already on
      // Check if Bluetooth is powered on
      const state = await bleManager.state()
      if (state !== State.PoweredOn) {
        sendLocalNotification('BLE Error', `Bluetooth is not powered on. Current state: ${state}`)
        return
      }

      const devices: Device[] = []
      bleManager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.error('Error Code:', error.errorCode)
          console.error('Error Message:', error.message)
          console.error('Error Reason:', error.reason)
          sendLocalNotification('Background BLE scan', `Error scanning for devices: ${error}`)
          console.log(error)
        }
        if (device) {
          devices.push(device)
          // if (followedIDs.includes(device.id)) {
          setScannedDevices((prevState: Device[]) => {
            if (!isDuplicteDevice(prevState, device)) {
              return [...prevState, device]
            }
            return prevState
          })
          // alert(`You're near ${device.name || 'a followed user'}!`)
          // }
        }
      })
      sendLocalNotification(
        'Background BLE scan',
        `Found ${devices.length} devices, ${devices.map((d) => d.name).join(', ')}, ${devices.map(
          (d) => d.id,
        )}`,
      )
    } catch (error) {
      console.error('Error starting BLE scan:', error)
      sendLocalNotification('BLE Error', `Failed to start BLE scan: ${error.message}`)
    }
  }

  // const connectToDevice = async (device: Device) => {
  //   try {
  //     const deviceConnection = await bleManager.connectToDevice(device.id)
  //     setConnectedDevice(deviceConnection)
  //     await deviceConnection.discoverAllServicesAndCharacteristics()
  //     bleManager.stopDeviceScan()
  //     startStreamingData(deviceConnection)
  //   } catch (e) {
  //     console.log('FAILED TO CONNECT', e)
  //   }
  // }

  // const disconnectFromDevice = () => {
  //   if (connectedDevice) {
  //     bleManager.cancelDeviceConnection(connectedDevice.id)
  //     setConnectedDevice(null)
  //     setHeartRate(0)
  //   }
  // }

  const requestBLEPermissions = async () => {
    const permissionsGranted = await requestPermissions()
    if (!permissionsGranted) {
      alert('Bluetooth permissions are required to use this feature')
      return false
    }
    return true
  }
  useEffect(() => {
    const initializeBLE = async () => {
      const granted = await requestBLEPermissions()
      console.log('granted', granted)
      if (!granted) return

      console.log('registering background fetch: ', isEnabled)
      if (isEnabled) {
        // await registerBackgroundFetch()
        await scanForPeripherals()
      } else {
        await unregisterBackgroundFetch()
        bleManager.stopDeviceScan()
      }
    }

    initializeBLE()
    // Clean up the BLE scan on component unmount
    return () => {
      bleManager.stopDeviceScan()
    }
  }, [bleManager, requestBLEPermissions, scanForPeripherals, isEnabled])

  // Return the list of scanned devices and any additional data you want to expose
  return { scannedDevices }
}

export default useBLEProximity
