/**
 * AquaFlow - Water Delivery Manager
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#1E88E5" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
