import { config } from '@rooots/ui'

export type Conf = typeof config

declare module 'tamagui' {
  type TamaguiCustomConfig = Conf
}

export default config
