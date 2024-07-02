import React from 'react';
import { ThemeProvider } from '@/components/ThemeContext';
import { DrawerProvider } from '@/components/drawerContext';
import AppNavigator from '@/components/AppNavigator';
import firebase from '@react-native-firebase/app';

export default function App() {
  return ( 
   <ThemeProvider> 
    <DrawerProvider>
      <AppNavigator />
    </DrawerProvider>
   </ThemeProvider>
  );
}