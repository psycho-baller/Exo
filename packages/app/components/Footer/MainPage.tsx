import { Home, Plus, Search, User, Users } from '@tamagui/lucide-icons'
import type { FC } from 'react'
import { Platform } from 'react-native'
import { Link } from 'solito/link'

import type { PageProps } from '@acme/ui'
import { Button, FloatingFooter, Page } from '@acme/ui'

import { useAddPersonStore } from '../../stores/addQuestion'
import { AddQuestion } from './AddQuestion'

type Props = PageProps

export const MainPage: FC<Props> = ({ children }) => {
  const [setDropdownOpen] = useAddPersonStore((state) => [state.setDropdownOpen])

  function handlePlusClick() {
    setDropdownOpen(true)
  }

  return (
    <Page>
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
