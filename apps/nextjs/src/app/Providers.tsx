'use client'

import '@tamagui/core/reset.css'
import './globals.css'

import '@tamagui/polyfill-dev'

import { useServerInsertedHTML } from 'next/navigation'
import type React from 'react'

import { Provider } from '@acme/app/provider'

import Tamagui from '../../tamagui.config'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  // useServerInsertedHTML(() => {
  //   // @ts-ignore
  //   const rnwStyle = StyleSheet.getSheet(;
  //   return (
  //     <>
  //       <style dangerouslySetInnerHTML={{ __html: rnwStyle.textContent }} id={rnwStyle.id} />
  //       <style
  //         dangerouslySetInnerHTML={{
  //           __html: Tamagui.getNewCSS({
  //             // if you are using "outputCSS" option, you should use this "exclude"
  //             // if not, then you can leave the option out
  //             exclude: process.env.NODE_ENV === 'production' ? 'design-system' : null,
  //           }),
  //         }}
  //       />
  //     </>
  //   );
  // });
  useServerInsertedHTML(() => {
    // the first time this runs you'll get the full CSS including all themes
    // after that, it will only return CSS generated since the last call
    return <style dangerouslySetInnerHTML={{ __html: Tamagui.getNewCSS() }} />
  })

  return <Provider>{children}</Provider>
}
