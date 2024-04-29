import { Home, Plus, Search, User, Users } from '@tamagui/lucide-icons'
import { useRef, useCallback, useEffect } from 'react'
import type { FC } from 'react'
import { Platform } from 'react-native'
import { Link } from 'solito/link'

import type { PageProps, BottomSheetModalRef } from '@acme/ui'
import { Button, FloatingFooter, Page } from '@acme/ui'

import { useAddPersonStore } from '../../stores/addQuestion'
import { AddQuestion } from './AddQuestion'
import { } from '@gorhom/bottom-sheet'
import { useAtom } from 'jotai'
import { useAtomCallback } from "jotai/utils";
import { dropdownOpenAtom } from '../../atoms/addQuestion'

type Props = PageProps

export const MainPage: FC<Props> = ({ children, ...props }) => {
  // const [setDropdownOpen] = useAddPersonStore((state) => [state.setDropdownOpen])
  const [dropdownOpen, setDropdownOpen] = useAtom(dropdownOpenAtom)
  // const readDropdownChange = useAtomCallback(
  //   useCallback((get) => {
  //     const currCount = get(derivedDropdownOpenAtom);
  //     // setDropdownOpen(currCount);
  //     console.log('currCount', currCount)
  //     // if (!currCount) bottomSheetRef.current?.expand()

  //     // return currCount;
  //   }, [])
  // );

  const handlePresentModalPress = () => setDropdownOpen(false)

  function handlePlusClick() {
    // setDropdownOpen(true)
    // setDropdownOpen({ newValue: true, onSet: () => bottomSheetRef.current?.expand() })
    // bottomSheetRef.current?.expand()
  }

  return (
    <Page {...props}>
      <Button flex={1} onPress={handlePresentModalPress}>
        <Button.Text>Present Modal</Button.Text>
      </Button>
      {children}
      {Platform.OS === 'web' && (
        <FloatingFooter blurIntensity={40}>
          <Link href='/questions'>
            <Home size={'$2'} />
          </Link>
          <Link href='/people'>
            <User size={'$2'} />
          </Link>
          <Button
            unstyled
            onPress={handlePlusClick}
            cursor='pointer'
            icon={<Plus size={'$2.5'} />}
          />
          <Link href='/search'>
            <Search size={'$2'} />
          </Link>
          <Link href='/groups'>
            <Users size={'$2'} />
          </Link>
        </FloatingFooter>
      )}
      {/* <Button
        // unstyled
        borderRadius='$xl'
        backgroundColor='$background'
        paddingHorizontal='$2.5'
        paddingVertical='$5'
        position='absolute'
        right='$4.5'
        bottom='11.5%'
        onPress={handlePlusClick}
        cursor='pointer'
        icon={<Plus size={'$3'} />}
      /> */}
      <AddQuestion />
    </Page>
  )
}
