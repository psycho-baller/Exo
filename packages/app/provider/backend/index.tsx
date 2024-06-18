import { Provider } from '@acme/api/utils/provider'

export const BackendProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return <Provider>{children}</Provider>
}
