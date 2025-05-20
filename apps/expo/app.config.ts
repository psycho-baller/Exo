import type { ConfigContext, ExpoConfig } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Exo',
  slug: 'rooots',
  scheme: 'rooots',
  version: '0.1.0',
  orientation: 'portrait',
  // androidNavigationBar: {
  //   visible: 'immersive',
  //   barStyle: 'light-content',
  //   backgroundColor: '#000000',
  // },
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    buildNumber: '3',
    bundleIdentifier: 'com.ramimaalouf.rooots',
    supportsTablet: true,
    // needs membership to Apple Developer Program to use Push Notifications
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      //   NSBluetoothAlwaysUsageDescription: 'This app uses Bluetooth to scan for nearby devices.',
      //   UIBackgroundModes: ['bluetooth-central', 'location', 'fetch', 'remote-notification'],
    },
  },
  android: {
    package: 'com.ramimaalouf.rooots',
    edgeToEdgeEnabled: true,
    // googleServicesFile: './android/app/google-services.json',
    adaptiveIcon: {
      foregroundImage: './assets/android-icon.jpg',
      backgroundColor: '#000617',
      // monochromeImage: './assets/android-icon.jpg',
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
    // screenDimensions: {
    //   width: 1080,
    //   height: 1920
    // },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
    // reactCanary: true,
  },
  plugins: [
    'expo-router',
    'expo-sqlite',
    [
      'expo-splash-screen',
      {
        image: './assets/9-16-icon.jpg',
        resizeMode: 'cover',
        backgroundColor: '#000617',
        // dark: {
        //   image: "./assets/splash-icon-dark.png",
        //   backgroundColor: "#000000"
        // },
        imageWidth: 350
      },
      // [
      //   '@config-plugins/react-native-ble-plx',
      //   {
      //     isBackgroundEnabled: true,
      //     modes: ['peripheral', 'central'],
      //     bluetoothAlwaysPermission: 'Allow $(PRODUCT_NAME) to connect to bluetooth devices',
      //   },
      // ],
    ],
  ],
})
