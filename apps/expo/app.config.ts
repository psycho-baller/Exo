import type { ConfigContext, ExpoConfig } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'expo',
  slug: 'expo',
  scheme: 'expo',
  version: '0.1.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/icon.png',
    resizeMode: 'contain',
    backgroundColor: '#0D23FF',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: 'com.convo-topics',
    supportsTablet: true,
  },
  android: {
    package: 'com.convo-topics',
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#0D23FF',
    },
  },
  web: {
    bundler: 'metro',
  },
  extra: {
    eas: {
      projectId: '157198b0-9bf6-40f4-b39f-499bd1862c21',
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: ['expo-router'],
});
