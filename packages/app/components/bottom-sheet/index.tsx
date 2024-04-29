import { useRef, useMemo, useEffect } from 'react';
import type { FC } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import type { BottomSheetProps } from '@gorhom/bottom-sheet';
import { Button, View, Text } from 'tamagui';
import { useAtom } from 'jotai';
import { sheetRefAtom } from '../../atoms/addQuestion';
export type BottomSheetModalRef = BottomSheetModal;

interface Props extends Omit<BottomSheetProps, ''> {
}

const CloseBtn = () => {
	const [sheetRef, setSheetRef] = useAtom(sheetRefAtom)


	return <Button onPress={() => {
		console.log('sheetRef', sheetRef)
		sheetRef?.current?.close();
	}}>
		<Button.Text>Close</Button.Text>
	</Button>;
};

export const BottomSheet: FC<Props> = ({ children, snapPoints = ['25%'], ...props }) => {
	const [_, setSheetRef] = useAtom(sheetRefAtom)
	
	const bottomSheetRef = useRef<BottomSheetModalRef>(null);
	const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);
	useEffect(() => {
		setSheetRef(bottomSheetRef)
	}, [setSheetRef])

	return (
		<BottomSheetModal
			ref={bottomSheetRef}
			index={0}
			snapPoints={snapPointsMemo}
			onChange={(index) => console.log('index', index)}
			enablePanDownToClose={true}
			handleIndicatorStyle={{ backgroundColor: '#fff' }}
			backgroundStyle={{ backgroundColor: '#1d0f4e' }}
			{...props}
		>
			<View >
				{children}
				<CloseBtn />
			</View>
		</BottomSheetModal>
	);
}