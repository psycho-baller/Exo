// Import necessary components from React Native
"use client";
import React from 'react';
import { View, Text, Button } from 'react-native';

// Define your component
export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello, world!</Text>
      <Button
        title="Press me"
        onPress={() => console.log('Button pressed!')}
      />
    </View>
  );
}