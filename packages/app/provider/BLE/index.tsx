import { useEffect } from "react"
import useBLEProximity from "../../hooks/useBLEProximity"
import { initializeBackgroundBleTask, unregisterBackgroundBleTask } from "../../utils/backgroundBle"
export const BLEProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  useBLEProximity()
  useEffect(() => {
    initializeBackgroundBleTask()
    // return () => {
    //   unregisterBackgroundBleTask()
    // }
  }, [])
  return <>{children}</>
}
