import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useOnboarding } from '../../contexts/OnboardingContext';

export default function HomeScreen() {
  const { resetOnboarding } = useOnboarding();

  const handleRevisitOnboarding = () => {
    resetOnboarding();
    // Navigate to the onboarding screen using the correct path
    router.replace({
      pathname: '/onboarding',
      // @ts-ignore - Workaround for expo-router type issue
      params: { from: 'home' }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the App</Text>
      <Text style={styles.subtitle}>Use the menu in the top-left to navigate</Text>
      
      <View style={styles.content}>
        <Text style={styles.text}>
          This is the main screen of your app. You can add your content here.
        </Text>
        
        <Pressable 
          style={styles.link} 
          onPress={handleRevisitOnboarding}
        >
          <Text>Revisit Onboarding</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});
