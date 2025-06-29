import { createContext, useContext, useEffect } from 'react'
import type { ReactNode } from 'react'
import { initializeAmplitude } from '../../utils/amplitude'
import Constants from 'expo-constants';
interface AnalyticsContextValue {
  // Add analytics methods here if needed
}

const AnalyticsContext = createContext<AnalyticsContextValue>({})

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initializeAmplitude(Constants.expoConfig?.extra?.amplitudeApiKey || '')
  }, [])

  return (
    <AnalyticsContext.Provider value={{}}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  return useContext(AnalyticsContext)
}