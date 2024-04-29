import { useRef, useMemo, useEffect } from 'react';
import type { FC } from 'react';
import { useBottomSheetModal, BottomSheetModal } from '@gorhom/bottom-sheet';
import type { BottomSheetProps } from '@gorhom/bottom-sheet';
import { Button, View, Text } from 'tamagui';
import { useAtom } from 'jotai';
import { dropdownOpenAtom } from '../../../app/atoms/addQuestion';
export type BottomSheetModalRef = BottomSheetModal;

interface Props extends Omit<BottomSheetProps, ''> {
	title: string;
}

const CloseBtn = () => {
	const { dismiss } = useBottomSheetModal();
	const [dropdownOpen, setDropdownOpen] = useAtom(dropdownOpenAtom)


	return <Button onPress={() => {
		setDropdownOpen(false)
	}}>
		<Button.Text>Close</Button.Text>
	</Button>;
};


export const BottomSheet: FC<Props> = ({ title, snapPoints = ['25%'], ...props }) => {
	const [dropdownOpen, setDropdownOpen] = useAtom(dropdownOpenAtom)

	const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);
	useEffect(() => {
		// readDropdownChange()
		console.log('dropdownOpen', dropdownOpen)
		console.log('bottomSheetRef.current', bottomSheetRef.current)
		if (dropdownOpen) bottomSheetRef.current?.present()
		if (!dropdownOpen) bottomSheetRef.current?.close()
	}, [dropdownOpen])
	const bottomSheetRef = useRef<BottomSheetModalRef>(null);


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
				<Text >{title}</Text>
				<CloseBtn />
			</View>
		</BottomSheetModal>
	);
}