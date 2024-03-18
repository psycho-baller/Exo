/** @type {import("@babel/core").ConfigFunction} */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      ...(process.env.EAS_BUILD_PLATFORM === 'android'
        ? []
        : [
          [
            '@tamagui/babel-plugin',
            {
              components: ['@acme/ui', 'tamagui'],
              config: './tamagui.config.ts',
            },
          ],
        ]),
      // if you want reanimated support
      // '@babel/plugin-transform-export-namespace-from',
      // 'react-native-reanimated/plugin',
    ],
  };
};
