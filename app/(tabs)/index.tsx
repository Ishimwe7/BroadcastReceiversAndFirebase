import React from 'react';
import { ThemeProvider } from '@/components/ThemeContext';
import { DrawerProvider } from '@/components/drawerContext';
import AppNavigator from '@/components/AppNavigator';
import firebase from '@react-native-firebase/app';
import useBatteryMonitor from '@/eventEmitters/battery';
import useNetworkStatus from '@/eventEmitters/connectivity';
import { View, Text } from 'react-native';
import '@/i18n';
export default function App() {
  const connection = useNetworkStatus();
  const battery = useBatteryMonitor();
  return ( 
   <ThemeProvider> 
      <DrawerProvider>
        <AppNavigator />
        {connection && (
          <View style={{ position: 'absolute', top: '15%', width: '100%', height: 50, backgroundColor: connection.color, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>
              {connection.message}
            </Text>
          </View>
        )}
        {battery !== null && (
          <View style={{ position: 'absolute', left:'25%', top: '10%', width: '50%', height: 40, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000', fontSize: 16 }}>
              Battery Level: {battery}%
            </Text>
          </View>
        )} 
    </DrawerProvider>
   </ThemeProvider>
  );
}