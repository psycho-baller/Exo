import { TRPCProvider as TRPCProviderOG } from '../../utils/api'

export const TRPCProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return <TRPCProviderOG>{children}</TRPCProviderOG>
}
