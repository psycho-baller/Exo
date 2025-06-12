import { NavigatorScreenParams } from '@react-navigation/native';

export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList {
      '(tabs)': NavigatorScreenParams<TabParamList>;
      onboarding: undefined;
      // Add other routes as needed
    }

    interface TabParamList {
      index: undefined;
      // Add other tab routes as needed
    }
  }
}

// Extend the expo-router types
declare module 'expo-router' {
  export function useRouter(): {
    push: (path: string) => void;
    replace: (path: string) => void;
    back: () => void;
    canGoBack: () => boolean;
    setParams: (params: Record<string, string>) => void;
  };

  export function useNavigation(): any; // You can refine this type as needed

  export function useRoute(): {
    params: Record<string, any>;
    name: string;
    key: string;
  };

  export function useFocusEffect(
    effect: () => void | (() => void | undefined),
    deps?: React.DependencyList
  );

  export function useIsFocused(): boolean;
}
