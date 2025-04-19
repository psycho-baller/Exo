import { useRef, useMemo, useEffect, forwardRef, useCallback } from 'react';
import type { FC, RefObject } from 'react';
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { View, useThemeName } from 'tamagui';
import { useAtom } from 'jotai';
import type { PrimitiveAtom } from 'jotai';
import { BlurView } from 'expo-blur';
export type BottomSheetModalRef = BottomSheetModal;
import { Platform } from 'react-native';
interface Props extends Omit<BottomSheetModalProps, ''> {
	sheetRefAtom: PrimitiveAtom<RefObject<BottomSheetModalRef> | null>
}

export const BottomSheet = forwardRef<BottomSheetModalRef, Props>(({ children, sheetRefAtom, snapPoints, ...props }, ref) => {
	const themeName = useThemeName() as 'light' | 'dark'
	const [_, setSheetRef] = useAtom(sheetRefAtom)
	const refIfNotProvided = useRef<BottomSheetModalRef>(null);
	const refWeUse = ref as RefObject<BottomSheetModalRef> ?? refIfNotProvided;

	const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);
	useEffect(() => {
		setSheetRef(refWeUse)
	}, [setSheetRef, refWeUse])

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	);

	return (
		<BottomSheetModal
			ref={refWeUse}
			backdropComponent={renderBackdrop}
			snapPoints={snapPointsMemo}
			onChange={(index) => console.log('index', index)}
			android_keyboardInputMode='adjustPan'
			enablePanDownToClose={true}
			enableDynamicSizing={true}
			enableHandlePanningGesture
			keyboardBehavior='interactive'
			keyboardBlurBehavior='none'
			handleIndicatorStyle={{ backgroundColor: '#aaa' }}
			backgroundComponent={({ style }) =>
				<BlurView
					tint={themeName === 'dark' ? 'dark' : 'extraLight'}
					intensity={themeName === 'dark' ? 60 : 100}
					blurReductionFactor={3}
					experimentalBlurMethod="dimezisBlurView"
					style={[style, { borderRadius: 20, overflow: "hidden" }]}
				/>
			}
			{...props}
		>
			<BottomSheetView>
				<View paddingHorizontal='$3' paddingBottom={Platform.OS === 'android' ? '$4.5' : 0}>
					{children}
				</View>
			</BottomSheetView>
		</BottomSheetModal>
	);
});