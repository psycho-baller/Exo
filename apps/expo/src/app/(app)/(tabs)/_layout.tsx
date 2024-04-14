import React from 'react';
import { BlurView } from 'expo-blur';
import { Tabs, useSegments } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useAddPersonStore } from '@acme/app/stores/addQuestion';
import { useThemeName } from '@acme/ui';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const themeName = useThemeName();
  const segments = useSegments();
  const [dropdownOpen, setDropdownOpen] = useAddPersonStore((state) => [
    state.dropdownOpen,
    state.setDropdownOpen,
  ]);

  return (
    <Tabs
      screenOptions={{
        // tabBarInactiveBackgroundColor: theme.background?.get(),
        // tabBarActiveBackgroundColor: theme.background?.get(),
        // tabBarInactiveTintColor: theme.text?.get(),
        tabBarBackground: () => (
          <BlurView
            intensity={50}
            tint={themeName === 'dark' ? 'dark' : 'light'}
            style={{
              flex: 1,
              overflow: 'hidden',
              left: 20,
              right: 20,
              bottom: 20,
              top: 0,
              position: 'absolute',
              opacity: 10,
              backgroundColor: 'transparent',
              borderRadius: 999,
              padding: 10,
            }}
          />
        ),
        tabBarStyle: {
          display: segments[3] === '[id]' ? 'none' : 'flex',
          // height: 250,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          // borderTopWidth: 0,
          // borderRadius: 999,
          // height: 70,
          // padding: 10,
        },
      }}
    >
      <Tabs.Screen
        name='questions'
        options={{
          title: 'Questions',
          headerShown: false,
          // headerTransparent: true,
          tabBarIcon: ({ color }) => <TabBarIcon name='home' color={color} />,
        }}
      />
      <Tabs.Screen
        name='people'
        options={{
          title: 'People',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} style={{ marginBottom: -3 }} name='users' color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='addQuestion'
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => <TabBarIcon name='plus' color={color} />,
          headerShown: false,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            setDropdownOpen(true);
          },
        }}
      />
      <Tabs.Screen
        name='search'
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} style={{ marginBottom: -3 }} name='search' color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='groups'
        options={{
          title: 'Groups',
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} style={{ marginBottom: -3 }} name='users' color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
