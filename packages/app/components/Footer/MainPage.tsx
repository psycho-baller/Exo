import { Home, Plus, Search, User, Users } from '@tamagui/lucide-icons'
import type { FC } from 'react'
import { Platform } from 'react-native'
import { Link } from 'solito/link'

import type { PageProps } from '@acme/ui'
import { Button, FloatingFooter, Page } from '@acme/ui'

import { AddQuestion } from './AddQuestion'
import { useAtom } from 'jotai'
import { sheetRefAtom } from '../../atoms/addQuestion'
import { AddDateForQuestion } from './AddDateForQuestion'

type Props = PageProps

export const MainPage: FC<Props> = ({ children, ...props }) => {
  const [sheetRef] = useAtom(sheetRefAtom)

  const handlePresentModalPress = () => sheetRef?.current?.present()

  return (
    <Page {...props}>
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
            onPress={handlePresentModalPress}
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
      {/* Bottom sheets */}
      <AddQuestion />
      <AddDateForQuestion />
    </Page>
  )
}
