# Convo Topics

## Project structure

This monrepo project structure and tech stack was inspired by [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo) and [tamagui-starter](https://github.com/tamagui/starter-free)

```plaintext
.github
  └─ workflows
      └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├── auth-proxy
  │   ├── Nitro server to proxy OAuth requests in preview deployments
  │   └── Uses Auth.js Core
  ├── expo
  │   ├── Expo SDK 50
  │   ├── React Native using React 18
  │   ├── Navigation using Expo Router and Solito for cross-platform navigation
  │   ├── Tamagui as the UI library
  │   └── Typesafe API calls using tRPC
  └── nextjs
      ├── Next.js 14
      ├── React 18
      ├── Tamagui as the UI library
      └── E2E Typesafe API Server & Client using tRPC
packages
  ├── api
  │   └── tRPC v11 router definition
  ├── app
  │   └── Shared app logic. Most code is written here then imported into the expo and nextjs apps
  ├── auth
  │   └── Authentication using next-auth
  ├── db
  │   └── Typesafe db calls using Drizzle & Planetscale
  └── ui
      └── Tamagui reusable components and configurations
patches
  └── for modules that need to be patched
tooling
  ├── eslint
  │   └── shared, fine-grained, eslint presets
  ├── prettier
  │   └── shared prettier configuration
  └── typescript
      └── shared tsconfig you can extend from
turbo
  └── build system for TS monorepos
```

## Other charts

<!-- - [Extended ERD]() -->
- [Relational Model](./packages/db/docs/RM.png)
<!-- - [HIPO]() -->
- [DFD](./packages/db/docs/DFD.md)


## Tech Stack

- [tRPC](https://trpc.io)
- [React 18](https://reactjs.org)
- [Next.js](https://nextjs.org)
- [Expo](https://expo.dev)
- [Solito](https://solito.dev)
- [Tamagui](https://tamagui.dev)
- [Drizzle ORM](https://orm.drizzle.team)
- [Planetscale](https://planetscale.com)
- [Auth.js](https://authjs.org)
- [Turbo](https://turbo.build/repo)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [TypeScript](https://www.typescriptlang.org)

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v21.2.0 or higher)
- [Pnpm](https://pnpm.io)
- An emulator or physical device for iOS or Android (unless you are using the web)

### Setup dependencies

```bash
# Install dependencies
pnpm i

# Configure environment variables
# There is an `.env.example` in the root directory you can use for reference
cp .env.example .env

# Push the Drizzle schema to the database
pnpm db:push
```

### Configure Expo dev-script

#### Use iOS Simulator

1. Make sure you have XCode and XCommand Line Tools installed as shown on expo docs.

> NOTE: If you just installed XCode, or if you have updated it, you need to open the simulator manually once. Run npx expo start in the root dir, and then enter I to launch Expo Go. After the manual launch, you can run pnpm dev in the root directory.

2. Change the dev script at apps/expo/package.json to open the Android emulator.

```bash
+  "dev": "expo start --ios",
```
3. Run `pnpm dev` at the project root folder.

#### Use Android Emulator

1. Install Android Studio tools as shown on expo docs.

2. Change the dev script at apps/expo/package.json to open the Android emulator.

```bash
+  "dev": "expo start --android",
```

3. Run `pnpm dev` at the project root folder.

#### Use Web
```bash
+  "dev": "expo start --web",
```
Run `pnpm dev` at the project root folder.

> TIP: It might be easier to run each app in separate terminal windows, so you get the logs from each app separately. This is also required if you want your terminals to be interactive, e.g. to access the Expo QR code. You can run `pnpm --filter expo dev` and `pnpm --filter nextjs dev` to run each app in a separate terminal window.

## Troubleshoting

### Expo

#### Expo Go with Android Emulator & your device

To be able to run your app in your device, you will need to pass in `--tunnel` to the `expo start` command. This is because the default `lan` mode does not work with the Android Emulator in some routers as mentioned [here](https://stackoverflow.com/questions/67361077/expo-go-not-connecting-after-qr-code-scanning) and [here](https://stackoverflow.com/questions/45558678/unable-to-connect-android-phone-to-my-project-with-expo). But this will make our backend unreachable.

To avoid this issue, just use the Android Emulator and the Expo Go app in there.

Another issue you might face with the Android version of Expo Go is that `expo-router` will fail to detect where the codebase is at. Other times `expo-router` can't even be found lol.

One workaround is to define our own entrypoint instead of using `expo-router`'s one. You can do this by modifying the [./apps/expo/package.json](./apps/expo/package.json) file:

```json
- "main": "expo-router/entry",
+ "main": "index.js",
```

where `index.js` has the same content as `expo-router/entry`:

```js
import '@expo/metro-runtime';

import { App } from 'expo-router/build/qualified-entry';
import { renderRootComponent } from 'expo-router/build/renderRootComponent';

renderRootComponent(App);
```

In summary, just use the iOS simulator or the web version of the app.

#### Tamagui Lucide Icons breaking the build

- I resolved that by installing `react-native-svg` inside [.apps/expo](./apps/expo) and [./packages/app](./packages/app) but I removed it from the app dir because I think it's not needed there as long it's in the expo dir. If the issue persists, you can try to install it in the app dir as well.