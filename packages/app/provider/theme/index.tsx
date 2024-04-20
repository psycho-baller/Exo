import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import type React from 'react';
import { useEffect, useLayoutEffect } from 'react';
import { Appearance } from 'react-native';

import { useForceUpdate } from '@acme/ui';

import { appThemeKey, useAppTheme, useCurrentTheme } from '../../atoms/theme';
import { ThemeVariant } from '../../utils/theme';
import { storage } from '../kv';

export const TamaguiThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [appTheme, setAppTheme] = useAppTheme();
  const [currentTheme] = useCurrentTheme();
  const forceUpdate = useForceUpdate();

  const defaultTheme = 'system';
  const statusBarStyle =
    currentTheme === ThemeVariant.dark ? ThemeVariant.light : ThemeVariant.dark;
  const themeValue = currentTheme === ThemeVariant.dark ? DarkTheme : DefaultTheme;

  useEffect(() => {
    const systemThemeChangeListener = Appearance.addChangeListener(() => {
      setAppTheme(Appearance.getColorScheme() as ThemeVariant);
      forceUpdate();
    });
    return () => {
      systemThemeChangeListener.remove();
    };
  }, [setAppTheme, forceUpdate]);

  useLayoutEffect(() => {
    const savedAppTheme = storage.getString(appThemeKey);
    if (savedAppTheme !== undefined) {
      setAppTheme(savedAppTheme as ThemeVariant);
    }
  }, [setAppTheme]);

  useEffect(() => {
    if (appTheme === undefined) {
      storage.set(appThemeKey, defaultTheme);
      setAppTheme(defaultTheme);
      //  TODO: check if we still need to do this with MMKV or I can just go back to else
    } else if (appTheme) {
      storage.set(appThemeKey, appTheme);
    }
  }, [appTheme, setAppTheme]);

  return (
    <ThemeProvider value={themeValue}>
      <StatusBar style={statusBarStyle} />
      {children}
    </ThemeProvider>
  );
};

export const useRootTheme = () => {
  const [currentTheme] = useCurrentTheme();
  return [currentTheme];
};
