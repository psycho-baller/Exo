// Importing env files here to validate on build
import "./src/env.mjs";
import "@acme/auth/env.mjs";
import webpackPkg from 'webpack';
const { DefinePlugin } = webpackPkg;


/** @type {import("next").NextConfig} */
export const reactStrictMode = true;
export const transpilePackages = ["@acme/api", "@acme/auth", "@acme/db", "@acme/app",
  'solito',
  'react-native',
  'expo-linking',
  'expo-constants',
  'expo-modules-core',
  '@shopify/flash-list'
];
export function webpack(config, options) {
  // Mix in aliases
  if (!config.resolve) {
    config.resolve = {};
  }

  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    // Alias direct react-native imports to react-native-web
    'react-native$': 'react-native-web',
    // Alias internal react-native modules to react-native-web
    'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$': 'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
    'react-native/Libraries/vendor/emitter/EventEmitter$': 'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
    'react-native/Libraries/EventEmitter/NativeEventEmitter$': 'react-native-web/dist/vendor/react-native/NativeEventEmitter',
  };

  config.resolve.extensions = [
    '.web.js',
    '.web.jsx',
    '.web.ts',
    '.web.tsx',
    ...(config.resolve?.extensions ?? []),
  ];

  if (!config.plugins) {
    config.plugins = [];
  }

  // Expose __DEV__ from Metro.
  config.plugins.push(
    new DefinePlugin({
      __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    })
  );

  return config;
}
export const eslint = { ignoreDuringBuilds: true };
export const typescript = { ignoreBuildErrors: true };