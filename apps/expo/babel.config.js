/** @type {import("@babel/core").ConfigFunction} */
module.exports = function (api) {
  api.cache.forever();
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['../..'],
          alias: {
            // define aliases to shorten the import paths
            '@acme/app': '../../packages/app',
            '@acme/ui': '../../packages/ui',
          },
          extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
        },
      ],
      // if you want reanimated support
      '@babel/plugin-transform-export-namespace-from',
      'react-native-reanimated/plugin',
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
      'transform-inline-environment-variables',
    ],
  };
};
