# Convo Topics

[Roadmap](https://github.com/users/psycho-baller/projects/2/views/1)

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

- [Node.js](https://nodejs.org/en/) (v18.0.0 or higher)
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
