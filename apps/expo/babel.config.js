/** @type {import("@babel/core").ConfigFunction} */
module.exports = (api) => {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      ...(process.env.EAS_BUILD_PLATFORM === 'android'
        ? []
        : [
          [
            '@tamagui/babel-plugin',
            {
              components: ['@rooots/ui', 'tamagui'],
              config: './tamagui.config.ts',
            },
          ],
        ]),
      'jotai/babel/plugin-react-refresh',
      // for expo-sqlite
      ['inline-import', { extensions: ['.sql'] }],
      // if you want reanimated support
      // '@babel/plugin-transform-export-namespace-from',
      // 'react-native-reanimated/plugin',
    ],
  }
}
