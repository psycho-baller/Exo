import { useAtom } from 'jotai';
import { videoSheetRefAtom } from '../atoms/sheet';

export function useVideoSheetActions() {
  const [videoSheetRef] = useAtom(videoSheetRefAtom);

  const openVideoSheet = () => {
    videoSheetRef?.current?.present();
  };

  const closeVideoSheet = () => {
    videoSheetRef?.current?.close();
  };

  return { openVideoSheet, closeVideoSheet };
}