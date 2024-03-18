import '@expo/metro-runtime';

import { App } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';

// This file should only import and register the root. No components or exports
// should be added here.
renderRootComponent(App);

// import { registerRootComponent } from 'expo';
// import { ExpoRoot } from 'expo-router';

// // Must be exported or Fast Refresh won't update the context
// export function App() {
//   const ctx = require.context('./src/app');
//   return <ExpoRoot context={ctx} />;
// }

// registerRootComponent(App);
