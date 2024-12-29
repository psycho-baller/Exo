import type { ConfigContext, ExpoConfig } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Rooots',
  slug: 'rooots',
  scheme: 'rooots',
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
    bundleIdentifier: 'com.ramimaalouf.rooots',
    supportsTablet: true,
    // needs membership to Apple Developer Program to use Push Notifications
    // infoPlist: {
    //   NSBluetoothAlwaysUsageDescription: 'This app uses Bluetooth to scan for nearby devices.',
    //   UIBackgroundModes: ['bluetooth-central', 'location', 'fetch', 'remote-notification'],
    // },
  },
  android: {
    package: 'com.ramimaalouf.rooots',
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
      projectId: '16fcb756-2f56-4297-a42b-3350974bc2ce',
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
