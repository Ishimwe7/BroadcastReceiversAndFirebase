import { NativeModules, NativeEventEmitter } from 'react-native';

const { NetworkBatteryModule } = NativeModules;
const networkBatteryEmitter = new NativeEventEmitter(NetworkBatteryModule);

export const addNetworkBatteryListener = (callback: (event: any) => void) => {
    networkBatteryEmitter.addListener('NetworkBatteryEvent', callback);
};

export const removeNetworkBatteryListener = () => {
    networkBatteryEmitter.removeAllListeners('NetworkBatteryEvent');
};

export const showAlert = (message: string) => {
    NetworkBatteryModule.showAlert(message);
};
