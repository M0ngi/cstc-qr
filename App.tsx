import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InfoProvider } from './contexts/InfoProvider';
import { InfoDisplay } from './screens/info_display';
import { Navigator } from './navigation';

export default function App() {
  return (
    <InfoProvider>
      <SafeAreaProvider>
        <Navigator />
        <InfoDisplay />
      </SafeAreaProvider>
    </InfoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
