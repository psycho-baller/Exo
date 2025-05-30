import { createInterFont } from '@tamagui/font-inter'
import { createMedia } from '@tamagui/react-native-media-driver'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'
import { createTamagui } from 'tamagui'

import { animations } from './animations'

// https://github.com/dohomi/tamagui-kitchen-sink
// https://github.com/tamagui/starter-free/blob/main/packages/config/package.json
const headingFont = createInterFont({
  size: {
    6: 15,
  },
  transform: {
    6: 'uppercase',
    7: 'none',
  },
  weight: {
    6: '400',
    7: '700',
  },
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    15: -6,
  },
  face: {
    700: { normal: 'InterBold' },
  },
})

const bodyFont = createInterFont(
  {
    face: {
      700: { normal: 'InterBold' },
    },
  },
  {
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => Math.round(size * 1.1 + (size > 20 ? 10 : 10)),
  },
)

export const config = createTamagui({
  defaultFont: 'body',
  defaultTheme: 'dark',
  animations: animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    body: bodyFont,
    heading: headingFont,
  },
  tokens,
  themes: {
    ...themes,
    dark: {
      ...themes.dark,
      background: '#111',
      secondaryBackground: '#444',
      color: '#fff',
      secondaryColor: '#999',
      accent: '#9EF9FE',
      secondaryAccent: '#D4FF9C',
      textAccent: '#003239',
    },
    light: {
      ...themes.light,
      background: '#fff',
      secondaryBackground: '#ccc',
      color: '#111',
      secondaryColor: '#999',
      accent: '#9EF9FE',
      secondaryAccent: '#D4FF9C',
      darkerAccent: '#5FD8DD',         // soft but vibrant cyan
      darkerSecondaryAccent: '#A8D45B', // bright limey green with a fresh tone
      textAccent: '#003239',
    },
  },
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
})
