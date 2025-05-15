import { useRef, useMemo, useEffect, forwardRef, useCallback } from 'react';
import type { FC, RefObject } from 'react';
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { View, useThemeName } from 'tamagui';
import { useAtom } from 'jotai';
import type { PrimitiveAtom } from 'jotai';
import { BlurView } from 'expo-blur';
export type BottomSheetModalRef = BottomSheetModal;
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
interface Props extends Omit<BottomSheetModalProps, ''> {
	sheetRefAtom: PrimitiveAtom<RefObject<BottomSheetModalRef> | null>
}

export const BottomSheet = forwardRef<BottomSheetModalRef, Props>(({ children, sheetRefAtom, snapPoints, ...props }, ref) => {
	const themeName = useThemeName() as 'light' | 'dark'
	const [_, setSheetRef] = useAtom(sheetRefAtom)
	const refIfNotProvided = useRef<BottomSheetModalRef>(null);
	const refWeUse = ref as RefObject<BottomSheetModalRef> ?? refIfNotProvided;
	const insets = useSafeAreaInsets();
	const isAndroidAndUsesLegacyNavigation = Platform.OS === 'android' && insets.bottom === 48
	const bottomPadding = 0// Platform.OS === 'android' ? (isAndroidAndUsesLegacyNavigation ? '$8' : '$4.5') : '0'

	const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);
	useEffect(() => {
		setSheetRef(refWeUse)
	}, [setSheetRef, refWeUse])

	const renderBackdrop = useCallback(
		(props: BottomSheetBackdropProps) => (
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
				<View paddingHorizontal='$3' paddingBottom={bottomPadding}>
					{children}
				</View>
			</BottomSheetView>
		</BottomSheetModal>
	);
});