// import Contacts, { Contact } from 'react-native-contacts';
// import { PermissionsAndroid, Platform } from 'react-native';

// export async function requestContactsPermission(): Promise<boolean> {
//   if (Platform.OS === 'android') {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
//       {
//         title: 'Contacts Permission',
//         message: 'This app would like to view your contacts.',
//         buttonPositive: 'Accept',
//         buttonNegative: 'Deny'
//       }
//     );

//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   }

//   return true; // iOS permissions are granted on install
// }

// export async function getContacts(): Promise<Contact[]> {
//   const permission = await requestContactsPermission();

//   if (!permission) {
//     throw new Error('Permission to access contacts was denied');
//   }
//   try {
//     const contacts = await Contacts.getAll();
//     return contacts;
//   } catch (error) {
//     console.error('Error retrieving contacts:', error);
//     throw new Error('Failed to retrieve contacts');
//   }
//   //return Contacts.getAll();
// }

// getContacts()
//   .then(contacts => console.log('Contacts:', contacts))
//   .catch(error => console.warn(error));

import * as Contacts from "expo-contacts";

export default async function getContacts(): Promise<Contacts.Contact[]> {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status === "granted") {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    if (data.length > 0) {
      return data;
    } else {
      throw new Error("No contacts found");
    }
  } else {
    throw new Error("Permission to access contacts was denied");
  }
}
