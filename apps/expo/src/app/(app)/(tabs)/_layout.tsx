import React from 'react';
import { BlurView } from 'expo-blur';
import { Tabs, useSegments } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useTheme } from '@acme/ui';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const theme = useTheme();
  const segments = useSegments();
  console.log('segments', segments);

  return (
    <Tabs
      screenOptions={{
        // tabBarInactiveBackgroundColor: theme.background?.get(),
        // tabBarActiveBackgroundColor: theme.background?.get(),
        // tabBarInactiveTintColor: theme.text?.get(),
        tabBarBackground: () => (
          <BlurView
            // intensity={100}
            tint={'dark'}
            style={{
              flex: 1,
              // left: 20,
              // right: 20,
              // bottom: 20,
              // position: 'absolute',
              backgroundColor: theme.background?.get(),
              // borderRadius: 999,
              // padding: 10,
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: 'transparent',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
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
          tabBarIcon: ({ color }) => <TabBarIcon name='question-circle' color={color} />,
          tabBarStyle: {
            display: segments[3] === '[id]' ? 'none' : 'flex',
          },
        }}
      />
      <Tabs.Screen
        name='people'
        options={{
          title: 'People',
          // tabBarIcon: ({ size, color }) => (
          //   <Ionicons name="chatbubbles" size={size} color={color} />
          // ),
          headerShown: false,
          tabBarStyle: {
            display: segments[3] === '[id]' ? 'none' : 'flex',
          },
        }}
      />
    </Tabs>
  );
}
