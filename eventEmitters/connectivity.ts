import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

// Define an interface for your connection status
interface ConnectionStatus {
  message: string;
  color: string;
}

const useNetworkStatus = () => {
  // Define the state with the interface, and initialize it as null
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setConnectionStatus({ message: "Offline !", color: 'gray' });
        setTimeout(() => setConnectionStatus(null), 2000);
      } else {
        setConnectionStatus({ message: "Back online!", color: 'green' });
        setTimeout(() => setConnectionStatus(null), 2000);
      }
    });
return () => {
      unsubscribe();
    };
  }, []);

  return connectionStatus;
};

export default useNetworkStatus;