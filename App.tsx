import './config';
import React from 'react';
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