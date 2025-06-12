import type { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  '(tabs)': NavigatorScreenParams<TabParamList>;
  onboarding: undefined;
  // Add other routes as needed
};

export type TabParamList = {
  index: undefined;
  // Add other tab routes as needed
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
