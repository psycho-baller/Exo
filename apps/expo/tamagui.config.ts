// don't import from here, that's handled already
// instead this is just setting types for this folder

import { config } from '@rooots/ui'

type Conf = typeof config

declare module 'tamagui' {
  type TamaguiCustomConfig = Conf
}

export default config
