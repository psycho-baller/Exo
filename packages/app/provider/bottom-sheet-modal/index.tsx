import { BottomSheetModalProvider as BottomSheetModalProviderOg } from '@gorhom/bottom-sheet';


export const BottomSheetModalProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  return <BottomSheetModalProviderOg>{children}</BottomSheetModalProviderOg>;
}
