import { useEffect, useState } from 'react';
import * as Battery from 'expo-battery';
import { ToastAndroid } from 'react-native';
import { Audio } from 'expo-av';

type BatteryEventListener = ReturnType<typeof Battery.addBatteryLevelListener>;

const useBatteryMonitor = () => {
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/ringtones/ringtone.mp3')  // Ensure this is the correct path to your sound file
    );
            setSound(sound);
        };

        loadSound();  // Load the sound when the component mounts

        let subscription: BatteryEventListener | null = null;

        const updateBatteryLevel = async () => {
            if (!sound) {
                console.log('Sound is not loaded yet');
                return;
            }

            const batteryState = await Battery.getBatteryStateAsync();
            const level = await Battery.getBatteryLevelAsync();
            setBatteryLevel(Math.floor(level * 100)); 

            // Check if battery is charging and level reaches 60%
            if (batteryState === Battery.BatteryState.CHARGING && level >= 0.20) {
                ToastAndroid.show("Battery has reached 20%!", ToastAndroid.SHORT);
                try {
                    await sound.playAsync();
                } catch (error) {
                    console.error('Error playing sound:', error);
                }
            }
        };
        // Setup the listener once sound is loaded
        if (sound) {
            subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
                updateBatteryLevel();
            });

            // Initial check
            updateBatteryLevel();
        }

        return () => {
            // Cleanup function
            if (subscription) {
                subscription.remove();
            }
            if (sound) {
                sound.unloadAsync();
            }
        };
  }, [sound]);  // Rerun effect when sound is set

    return batteryLevel;
};

export default useBatteryMonitor;