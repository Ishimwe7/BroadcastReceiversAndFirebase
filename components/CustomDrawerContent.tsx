import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Image} from 'react-native';

import * as ImagePicker from "expo-image-picker";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';
 const [image, setImage] = useState<string | null>(null);

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {

  const { theme, toggleTheme } = useTheme();
   const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

const handleTakeImage = async () => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }
   const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
   });
  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};
const handleSelectImage = async () => {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("Permission to access camera roll is required!");
    return;
  }
  //const result = await ImagePicker.launchImageLibraryAsync();
   const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
   });
  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};

  return (
    <DrawerContentScrollView style={styles[theme].container} {...props}>
      <View style={styles[theme].drawerHeader}>
        <Image
          source={image ? { uri: image } : require('../assets/images/new-profile.jpg')}
          style={styles[theme].profileImage}
        />
        <Text style={styles[theme].nameText}>Eng.Nyanja</Text>
        <View style={styles[theme].profileOptions}>
          <Icon name="image-outline" size={30} color={styles[theme].iconColor.color} onPress={handleSelectImage} />
          <Icon name="camera-outline" size={30} color={styles[theme].iconColor.color} onPress={handleTakeImage} />
        </View>
      </View>
      <DrawerItem
        label="Sign Up"
        icon={({ color, size }) => (
          <Icon name="person-add-outline" color={styles[theme].iconColor.color} size={size} />
        )}
        onPress={() => props.navigation.navigate('Registration')}
         labelStyle={styles[theme].drawerItemLabel}
      />
      <DrawerItem
        label="Sign In"
        icon={({ color, size }) => (
          <Icon name="log-in-outline" color={styles[theme].iconColor.color} size={size} />
        )}
        onPress={() => props.navigation.navigate('Login')}
         labelStyle={styles[theme].drawerItemLabel}
      />
      <DrawerItem
        label="Calculator"
        icon={({ color, size }) => (
          <Icon name="calculator-outline" color={styles[theme].iconColor.color} size={size} />
        )}
        onPress={() => props.navigation.navigate('Calculator')}
         labelStyle={styles[theme].drawerItemLabel}
      />
       <DrawerItem
        label={t('Change Language')}
        icon={({ color, size }) => (
          <Icon name="language-outline" color={styles[theme].iconColor.color} size={size} />
        )}
        onPress={() => changeLanguage(i18n.language === 'en' ? 'fr' : 'en')}
        labelStyle={styles[theme].drawerItemLabel}
      />
       <DrawerItem
        label="Contacts"
        icon={({ color, size }) => (
          <Icon name="person-circle-outline" color={styles[theme].iconColor.color} size={size} />
        )}
        onPress={() => props.navigation.navigate('Contacts')}
        labelStyle={styles[theme].drawerItemLabel}
      />
      <View style={styles[theme].themeToggler}>
        <Text style={styles[theme].themeText}>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</Text>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggleTheme}
          trackColor={{ false: "#767577", true: "#767577" }} 
          thumbColor={theme === 'dark' ? "#000000" : "#FFFFFF"}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = {
  light: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      zIndex:999
    },
    drawerHeader: {
      backgroundColor: '#f6f6f6',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    drawerItem: {
      color:'fff'
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    drawerItemLabel: {
      color: '#000',
    },
    iconColor: {
      color: '#000',
    },
    profileOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '50%',
      marginTop: 10,
    },
    nameText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
    },
    themeToggler: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    themeText: {
      fontSize: 16,
      color: '#000',
    },
  }),
  dark: StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#333',
    },
    drawerHeader: {
      backgroundColor: '#222',
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10,
    },
    profileOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '50%',
      marginTop: 10,
    },
    drawerItem: {
      color:'000'
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 10,
    },
    drawerItemLabel: {
      color: '#fff',
    },
    iconColor: {
      color: '#fff',
    },
    nameText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
    },
    themeToggler: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    themeText: {
      fontSize: 16,
      color: '#fff',
    },
  }),
};

export default CustomDrawerContent;