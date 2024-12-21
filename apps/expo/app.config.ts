import type { ConfigContext, ExpoConfig } from 'expo/config'

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
    // needs membership to Apple Developer Program to use Push Notifications
    // infoPlist: {
    //   NSBluetoothAlwaysUsageDescription: 'This app uses Bluetooth to scan for nearby devices.',
    //   UIBackgroundModes: ['bluetooth-central', 'location', 'fetch', 'remote-notification'],
    // },
  },
  android: {
    package: 'com.convo_topics',
    // googleServicesFile: './android/app/google-services.json',
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#0D23FF',
    },
    // permissions: [
    //   'android.permission.BLUETOOTH',
    //   'android.permission.BLUETOOTH_ADMIN',
    //   'android.permission.BLUETOOTH_SCAN',
    //   'android.permission.BLUETOOTH_CONNECT',
    //   'android.permission.ACCESS_COARSE_LOCATION',
    //   'android.permission.ACCESS_FINE_LOCATION',
    //   'android.permission.ACCESS_BACKGROUND_LOCATION',
    //   'android.permission.BLUETOOTH_ADVERTISE',
    // ],
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
  plugins: [
    'expo-router',
    // [
    //   '@config-plugins/react-native-ble-plx',
    //   {
    //     isBackgroundEnabled: true,
    //     modes: ['peripheral', 'central'],
    //     bluetoothAlwaysPermission: 'Allow $(PRODUCT_NAME) to connect to bluetooth devices',
    //   },
    // ],
  ],
})
