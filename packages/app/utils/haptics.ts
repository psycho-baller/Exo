import * as Haptics from 'expo-haptics'
export const withHaptics = (fn: () => void) => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  fn()
}
