import React from 'react';
import { Stack, Redirect, useRouter, usePathname } from 'expo-router';
import { useEffect, useState, useMemo } from 'react';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import '../types/expo-router'; // Import our custom type declarations

// Create a simple provider if the app's provider is not available
const Provider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// Simple onboarding context
type OnboardingContextType = {
  isOnboarded: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

const OnboardingContext = React.createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = React.useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  
  const value: OnboardingContextType = React.useMemo(() => ({
    isOnboarded,
    completeOnboarding: () => setIsOnboarded(true),
    resetOnboarding: () => setIsOnboarded(false),
  }), [isOnboarded]);
  
  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

// Simple placeholder components
const DemoVideo = () => {
  return <View style={styles.hidden} />;
};

// BottomSheet component with proper typing
interface BottomSheetProps {
  children?: React.ReactNode;
  enablePanDownToClose?: boolean;
  sheetRefAtom?: React.RefObject<unknown>;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ 
  children,
  enablePanDownToClose = true,
  sheetRefAtom
}) => {
  const bottomSheetRef = React.useRef<View>(null);
  
  // Forward the ref if provided
  React.useEffect(() => {
    if (sheetRefAtom) {
      // @ts-ignore - We know this is a ref object
      sheetRefAtom.current = bottomSheetRef.current;
    }
  }, [sheetRefAtom]);
  
  return <View style={styles.hidden} ref={bottomSheetRef} />;
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

const RootLayout = () => {

  // const [loaded, error] = useFonts({
  //   Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
  //   InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  // })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // useEffect(() => {
  //   if (error) throw error
  // }, [error])

  // useEffect(() => {
  //   if (loaded) {
  //     // SplashScreen.hideAsync()
  //   }
  // }, [loaded])

  // if (!loaded) {
  //   return null
  // }

  return (
    <Provider>
      {/*
          The Stack component displays the current page.
          It also allows you to configure your screens
        */}
      <Stack
        initialRouteName="(tabs)"
        screenOptions={{
          // headerTransparent: true,
          headerShown: false,
          // navigationBarColor: 'transparent',
          // navigationBarHidden: true,
        }}
      >
        <Stack.Screen name='(tabs)' options={{ title: 'Home' }} />
        <Stack.Screen name='(auth)' options={{ title: 'Authorization' }} />
      </Stack>
      <BottomSheet
        enablePanDownToClose
        // snapPoints={['90%']}
        // enableDynamicSizing={false}
        // onClose={closeVideoSheet}
        // index={0}
        sheetRefAtom={videoSheetRefAtom}
      >
        <DemoVideo />
      </BottomSheet>
    </Provider>
  )
}

const MainApp = () => {
  const { isOnboarded, completeOnboarding } = useOnboarding();
  const [isReady, setIsReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return null;
  }

  const pathname = usePathname();
  
  // If not onboarded and not on the onboarding screen, redirect to onboarding
  if (!isOnboarded && pathname !== '/onboarding') {
    // Use type assertion to handle the redirect
    return <Redirect href="/onboarding" asChild />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            headerLeft: () => <DrawerToggleButton tintColor="#000" />,
            title: 'Home'
          }}
        />
        <Drawer.Screen
          name="onboarding"
          options={{
            headerShown: false,
          }}
        />
      </Drawer>
      <DemoVideo />
      <BottomSheet enablePanDownToClose={true} />
    </View>
  );
};

const AppLayout = () => {
  return (
    <Provider>
      <OnboardingProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding" />
          <MainApp />
        </Stack>
      </OnboardingProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
});

export default AppLayout;
