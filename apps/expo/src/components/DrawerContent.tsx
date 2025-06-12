import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import { useOnboarding } from '../contexts/OnboardingContext';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

import { DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const DrawerContent = (props: DrawerContentComponentProps) => {
  const router = useRouter();
  const { resetOnboarding } = useOnboarding();

  const handleGithubPress = () => {
    Linking.openURL('https://github.com/yourusername/your-repo');
  };

  const handleSupportPress = () => {
    Linking.openURL('https://www.buymeacoffee.com/yourusername');
  };

  const handleFeedbackPress = () => {
    Linking.openURL('mailto:your.email@example.com?subject=App Feedback');
  };

  const handleRevisitOnboarding = () => {
    resetOnboarding();
    props.navigation.navigate('(onboarding)');
  };

  return (
    <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
      <View style={styles.drawerSection}>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate('(tabs)/questions')}
        >
          <View style={styles.itemContent}>
            <MaterialIcons name="home" size={24} color="#333" />
            <Text style={styles.itemText}>Home</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={handleRevisitOnboarding}
        >
          <View style={styles.itemContent}>
            <MaterialIcons name="replay" size={24} color="#333" />
            <Text style={styles.itemText}>Revisit Onboarding</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={handleGithubPress}>
          <View style={styles.itemContent}>
            <FontAwesome name="github" size={24} color="#333" />
            <Text style={styles.itemText}>GitHub</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={handleSupportPress}>
          <View style={styles.itemContent}>
            <FontAwesome name="coffee" size={24} color="#333" />
            <Text style={styles.itemText}>Support Us</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.drawerItem} onPress={handleFeedbackPress}>
          <View style={styles.itemContent}>
            <MaterialIcons name="email" size={24} color="#333" />
            <Text style={styles.itemText}>Send Feedback</Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  drawerSection: {
    marginTop: 20,
  },
  drawerItem: {
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default DrawerContent;
