import { useEffect, useMemo, useState, useCallback } from 'react'
import { BleManager, type Device, State, type BleError, DeviceId } from 'react-native-ble-plx'
import * as ExpoDevice from 'expo-device'
import { requestPermissions } from '../utils/permissions'
import { sendLocalNotification } from './usePushNotifications'
import { filterDevices, getDeviceId, startAdvertisingHelper, unregisterBackgroundBleTask } from '../utils/backgroundBle'
import { SCAN_TIMEOUT, RETRY_INTERVAL, SHOULD_ADVERTISE, MAJOR, MINOR, COMPANY_ID } from '../utils/constants'


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
  const bytesToHex = (bytes: number[]): string => {
    return bytes.map((byte) => byte.toString(16).padStart(2, '0')).join('');
  }
  const extractManufacturerData = (manufacturerData: number[]): { major: number; minor: number, uuid: string } | null => {
    // Assuming the manufacturer data structure is as follows:
    // [0x02, 0x15, ...UUID..., majorByte1, majorByte2, minorByte1, minorByte2, 0xC7]
    if (manufacturerData.length === 0 || manufacturerData.length < 8) return null; // Ensure there's enough data

    // get the UUID
    const uuid = manufacturerData.slice(2, 18).map((byte) => byte.toString(16)).join('');
    console.log('UUID:', uuid);

    // last 4 bytes are major and minor
    const majorByte1 = manufacturerData[manufacturerData.length - 4];
    const majorByte2 = manufacturerData[manufacturerData.length - 3];
    const minorByte1 = manufacturerData[manufacturerData.length - 2];
    const minorByte2 = manufacturerData[manufacturerData.length - 1];
    if (!majorByte1 || !majorByte2 || !minorByte1 || !minorByte2) return null;

    // const companyId = firstByte << 8 | manufacturerData[1];

    const major = (majorByte1 << 8) | majorByte2;
    const minor = (minorByte1 << 8) | minorByte2;

    return { major, minor, uuid };
  };
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
        const filteredDevices = filterDevices(devices)


        for (const d of deviceScanResults) {
          // Decode manufacturer data for each scanned device
          console.error(
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
          if (d.manufacturerData) {
            // convert encoded string to number[]:
            // eg: 4AACFUTBPkMJepyfU39WZqaEDAgEOhDhxwA=
            console.log("unencoded manufacturer data:", d.manufacturerData)
            if (d.manufacturerData === '4AACFUTBPkMJepyfU39WZqaEDAgEOhDhxwA=') {
              sendLocalNotification('BRO', "Found the device")
            }
            const decodedManufacturerData = atob(d.manufacturerData)
            console.log("decoded manufacturer data:", decodedManufacturerData)
            const manufacturerDataBytes = Array.from(decodedManufacturerData).map((byte) => byte.charCodeAt(0));
            const manufacturerData = bytesToHex(manufacturerDataBytes);
            const decodedData = extractManufacturerData(manufacturerData);
            if (decodedData) {
              console.log("Decoded data from manufacturerData:", decodedData);
              console.log(`Device ID: ${d.id}, Major: ${decodedData.major}, Minor: ${decodedData.minor}`, decodedData.uuid);
              console.log(`same device id: ${"44C13E43097A9C9F537F5666A6840C08" === decodedData.uuid}`)
              if ("44C13E43097A9C9F537F5666A6840C08" === decodedData.uuid) {
                // 021544C13E43097A9C9F537F5666A684
                sendLocalNotification('AYO', "Found the device")
              }
            } else {
              console.warn('Failed to decode manufacturer data:', manufacturerData);
            }
          }
        }
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
