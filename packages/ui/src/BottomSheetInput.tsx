import { memo, useCallback, forwardRef, useEffect } from 'react';
import { UnstyledInput } from './UnstyledInput';
import type { UnstyledInputProps } from './UnstyledInput';
import { useBottomSheetInternal } from '@gorhom/bottom-sheet';

const BottomSheetTextInputComponent = forwardRef<
  // @ts-ignore
  UnstyledInput,
  UnstyledInputProps & {
    enabled?: boolean;
  }
>(({ onFocus, onBlur, enabled = true, ...rest }, ref) => {
  //#region hooks
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

  useEffect(() => {
    return () => {
      if (enabled) {
        // Reset the flag on unmount
        shouldHandleKeyboardEvents.value = false;
      }
    };
  }, [shouldHandleKeyboardEvents, enabled]);
  //#endregion

  //#region callbacks
  const handleOnFocus = useCallback(
    (args: any) => {
      if (enabled) {
        shouldHandleKeyboardEvents.value = true;
      }
      if (onFocus) {
        onFocus(args);
      }
    },
    [onFocus, shouldHandleKeyboardEvents, enabled]
  );
  const handleOnBlur = useCallback(
    (args: any) => {
      if (enabled) {
        shouldHandleKeyboardEvents.value = false;
      }
      if (onBlur) {
        onBlur(args);
      }
    },
    [onBlur, shouldHandleKeyboardEvents, enabled]
  );
  //#endregion

  return (
    <UnstyledInput
      ref={ref}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      {...rest}
    />
  );
});

export const BottomSheetInput = memo(BottomSheetTextInputComponent);
BottomSheetInput.displayName = 'BottomSheetTextInput';
