import React from "react";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { Provider } from "@acme/app/provider";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });
  const scheme = useColorScheme();

  if (!loaded) {
    return null;
  }
  return (
    <Provider>
      <ThemeProvider value={scheme === "dark" ? DarkTheme : DefaultTheme}>
        <TRPCProvider>
          {/*
        The Stack component displays the current page.
        It also allows you to configure your screens 
      */}
          <Stack />
          <StatusBar />
        </TRPCProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default RootLayout;
