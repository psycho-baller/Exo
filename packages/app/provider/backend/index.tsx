import { Provider } from '@rooots/api/utils/provider'

export const BackendProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return <Provider>{children}</Provider>
}
