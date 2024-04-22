// Importing env files here to validate on build
// require('./src/env.js');
// require('@acme/auth/env.mjs');
const MillionLint = require('@million/lint')
const { withTamagui } = require('@tamagui/next-plugin')
const { join } = require('path')
const boolVals = {
  true: true,
  false: false,
}

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development'

const enableMillionJS =
  boolVals[process.env.ENABLE_MILLION_JS] ?? process.env.NODE_ENV === 'production'

const plugins = [
  withTamagui({
    config: './tamagui.config.ts',
    components: ['tamagui', '@acme/ui'],
    appDir: true,
    importsWhitelist: ['constants.js', 'colors.js'],
    outputCSS: process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
    logTimings: true,
    disableExtraction,
    // experiment - reduced bundle size react-native-web
    useReactNativeWebLite: false,
    shouldExtract: (path) => {
      if (path.includes(join('packages', 'app'))) {
        return true
      }
    },
    excludeReactNativeWebExports: ['Switch', 'ProgressBar', 'Picker', 'CheckBox', 'Touchable'],
  }),
]
// See the "excludeReactNativeWebExports" setting in next.config.js, which omits these
// from the bundle: Switch, ProgressBar Picker, CheckBox, Touchable. To save more,
// you can add ones you don't need like: AnimatedFlatList, FlatList, SectionList,
// VirtualizedList, VirtualizedSectionList.
// MillionLint.next({
// rsc: true,
// })(
/** @type {import('next').NextConfig} */
module.exports = () => {
  let config = {
    typescript: {
      ignoreBuildErrors: true,
    },
    modularizeImports: {
      '@tamagui/lucide-icons': {
        transform: `@tamagui/lucide-icons/dist/esm/icons/{{kebabCase member}}`,
        skipDefaultConversion: true,
      },
    },
    transpilePackages: [
      'solito',
      'react-native-web',
      'expo-linking',
      'expo-blur',
      'react-native-gesture-handler',
      'expo-constants',
      'expo-modules-core',
    ],
    experimental: {
      scrollRestoration: true,
    },
  }
  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    }
  }

  const millionConfig = {
    auto: true,
    mute: true,
  }

  if (enableMillionJS) {
    config = MillionLint.next(config, millionConfig)
  }

  // if (enablePattyCake) {
  //   config = pattycake.next(config)
  // }

  return config
}
