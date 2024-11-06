import { useEffect, useMemo, useState, useCallback } from 'react'
import { BleManager, type Device, State, type BleError, DeviceId } from 'react-native-ble-plx'
import * as ExpoDevice from 'expo-device'
import { requestPermissions } from '../utils/permissions'
import { sendLocalNotification } from './usePushNotifications'
import { getDeviceId, startAdvertisingHelper, unregisterBackgroundBleTask } from '../utils/backgroundBle'

const SCAN_TIMEOUT = 10000 // 10 seconds
const RETRY_INTERVAL = 60000 // 1 minute
const COMPANY_ID = 0x12D

const MAJOR = 1234;
const MINOR = 4321;
const SHOULD_ADVERTISE = true;


const useBLEProximity = () => {
  const [scannedDevices, setScannedDevices] = useState<Device[]>([])
  const bleManager = useMemo(() => new BleManager(), [])
  const isEnabled = true

  const isDuplicateDevice = useCallback(
    (devices: Device[], nextDevice: Device) =>
      devices.findIndex((device) => nextDevice.id === device.id) > -1,
    [],
  )
  const alreadyFound = useCallback(
    (arr: Device[], device: Device) => arr.find((d) => d.id === device.id),
    [],
  )
  const scanForPeripherals = useCallback(async () => {
    const devices: Device[] = []
    let isScanning = false
    try {
      const state = await bleManager.state()
      if (state !== State.PoweredOn) {
        sendLocalNotification('BLE Error', `Bluetooth is not powered on. Current state: ${state}`)
        return devices
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
  }, [bleManager, isDuplicateDevice, alreadyFound])

  const handleScanError = useCallback(
    (error: BleError) => {
      console.error('BLE Scan Error:', error)
      console.error('Error Code:', error.errorCode)
      console.error('Error Message:', error.message)
      console.error('Error Reason:', error.reason)
      sendLocalNotification('BLE Scan Error', `${error.message}. Retrying in 1 minute.`)

      if (error.errorCode === 600) {
        // Schedule a retry after RETRY_INTERVAL
        setTimeout(() => {
          scanForPeripherals()
        }, RETRY_INTERVAL)
      }
    },
    [scanForPeripherals],
  )

  const requestBLEPermissions = useCallback(async () => {
    const permissionsGranted = await requestPermissions()
    if (!permissionsGranted) {
      alert('Bluetooth permissions are required to use this feature')
      return false
    }
    return true
  }, [])

  const startAdvertising = useCallback(async () => {
    if (SHOULD_ADVERTISE) {
      const UUID = "44C13E43-097A-9C9F-537F-5666A6840C08"
      try {
        await startAdvertisingHelper(UUID, MAJOR, MINOR, COMPANY_ID)
        //   // Optional: Add additional advertising options here
        //   localName: 'MyBLEDevice', // Optional: Set a local name for the advertisement
        // })
        console.log('Started advertising with UUID:', UUID)
      } catch (error) {
        console.error('Error starting advertising:', error)
      }
    }
  }, [])

  useEffect(() => {
    const initializeBLE = async () => {
      const granted = await requestBLEPermissions()
      console.log('Permissions granted:', granted)
      if (!granted) return

      console.info('Initializing BLE scan:', isEnabled)
      if (isEnabled) {
        await startAdvertising() // Start advertising if enabled
        const deviceScanResults = await scanForPeripherals()
        const devices = deviceScanResults.filter((d) => d.id)
        // const devicesWithNames = devices.filter((d) => d.name || d.localName)

        // for (const d of devices) {
        //   console.error(
        //     'Device:',
        //     `Found device: ${d.id}
        //   name: ${d.name}
        //   localName: ${d.localName}
        //   rssi: ${d.rssi}
        //   serviceUUIDs: ${d.serviceUUIDs}
        //   manufacturerData: ${d.manufacturerData}
        //   serviceData: ${d.serviceData}
        //   mtu: ${d.mtu}
        //   txPowerLevel: ${d.txPowerLevel}
        //   isConnectable: ${d.isConnectable}
        //   solicitedServiceUUIDs: ${d.solicitedServiceUUIDs}
        //   overflowServiceUUIDs: ${d.overflowServiceUUIDs}`,
        //   )
        // }
        sendLocalNotification('BLE Scan result', `Found ${deviceScanResults.length} devices`)
      } else {
        await unregisterBackgroundBleTask()
        bleManager.stopDeviceScan()
      }
    }

    void initializeBLE()

    return () => {
      bleManager.stopDeviceScan()
    }
  }, [bleManager, requestBLEPermissions, scanForPeripherals, startAdvertising])

  return { scannedDevices }
}

export default useBLEProximity
