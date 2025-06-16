# Exo

Time spent coding this up: [![wakatime](https://wakatime.com/badge/user/33addb7e-f5e6-470b-a55b-0a8babc62ebb/project/018c177e-bd65-49da-8571-8a45352f6953.svg)](https://wakatime.com/badge/user/33addb7e-f5e6-470b-a55b-0a8babc62ebb/project/018c177e-bd65-49da-8571-8a45352f6953.svg)

I just dropped the app on the [app store](https://apps.apple.com/app/exo-have-better-conversations/id6740080383) and google play store (email me @ <ramim66809@gmail.com> and I can give you access). You can download it from there or from the marketing website [here](https://exo.app)

## About

Our project aims to harness technology to foster deeper human connections by enhancing our ability to ask meaningful questions. Unlike social media, which often distances us from meaningful interactions, our approach focuses on fostering genuine bonds through the power of better questions.

### Vision

We believe that genuine bonds and transformative relationships stem from asking the right questions. Whether it’s finding the love of your life, building lifelong friendships, or forging professional connections, the quality of our interactions is shaped by the questions we ask.

### Problem

Often, we come up with brilliant questions that can spark meaningful conversations, but if not recorded, these questions are easily forgotten. The loss of these questions can mean missed opportunities for deeper connections, research insights, or even life-changing relationships.

### Our Solution

We are developing a local-first, cross-platform web and mobile application to easily capture and organize these questions. For example, you can connect these questions to certain a certain person (a friend) or group (your co-workers).

### Inspiration

Influential figures like Tim Ferriss exemplify the power of asking the right questions. By challenging himself and his guests with profound questions, he uncovers valuable insights and drives change. Similarly, we aim to empower individuals to ask and explore deep, thought-provoking questions that can lead to personal and societal transformation.

### Mission

Our mission is to inspire people to seek better questions by providing them with an app that gives them the ability to effortlessly store, connect, and retrieve questions. By doing so, we aim to cultivate a culture of curiosity and deeper understanding of ourselves and one another, ultimately contributing to a more connected and empathetic world (Unlike what social media is doing to us)

You know this quote from Steve Jobs, "The people who are crazy enough to think they can change the world are the ones who do."

Our version of this would be, "The people who come up with revealing deep thought-provoking questions and have the courage to ask it to themselves and the people around them are the ones who change the world"

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
  │   ├── Expo SDK 52
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
  │   └── Typesafe db calls using Drizzle & Turso (sqlite)
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
- [Turso](https://turso.tech)
- [Auth.js](https://authjs.org)
- [Turbo](https://turbo.build/repo)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [TypeScript](https://www.typescriptlang.org)

## Quick Start

### Prerequisites

- Unix based terminals (wsl works)
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

> TIP: It might be easier to run each app in separate terminal windows, so you get the logs from each app separately. This is also required if you want your terminals to be interactive, e.g. to access the Expo QR code. You can run `pnpm -F expo dev` and `pnpm dev:backend` to run each app in a separate terminal window.

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
