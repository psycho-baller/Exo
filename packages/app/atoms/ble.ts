import { atom, useAtom } from 'jotai'
import { storage } from '../provider/kv'
import { registerBackgroundBleTask, unregisterBackgroundBleTask } from '../utils/backgroundBle'

// Define the storage key
export const proximityDetectionEnabledKey = 'proximityDetectionEnabled'

// Create an atom for the boolean value
const initialValue = async () => {
  const storedValue = await storage.getString(proximityDetectionEnabledKey)
  return storedValue ? (JSON.parse(storedValue) as boolean) : false
}
const proximityDetectionEnabledAtom = atom<boolean>(await initialValue())

export function useProximityDetectionEnabled(): readonly [
  boolean,
  (newValue: boolean) => Promise<void>,
] {
  const [enabled, setEnabled] = useAtom(proximityDetectionEnabledAtom)

  const setEnabledWithBackground = async (newValue: boolean): Promise<void> => {
    await storage.set(proximityDetectionEnabledKey, JSON.stringify(newValue))
    setEnabled(newValue)
    if (newValue) {
      // await registerBackgroundBleTask()
    } else {
      await unregisterBackgroundBleTask()
    }
  }

  return [enabled, setEnabledWithBackground] as const
}

// The background fetch functionality is implemented in ../utils/backgroundBle.ts
// It periodically scans for nearby BLE devices in the background
// and processes the found devices (e.g., checks if they are followed users)
// This allows for proximity detection even when the app is not in the foreground
