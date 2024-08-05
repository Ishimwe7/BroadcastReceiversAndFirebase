import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import getContacts from '@/utils/contacts';
import { useTranslation } from 'react-i18next';

const ContactsScreen: React.FC = () => {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();
  useEffect(() => {
    const loadContacts = async () => {
      try {
        const fetchedContacts = await getContacts();
        const sortedContacts = fetchedContacts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setContacts(sortedContacts);
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        } else {
          Alert.alert('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  const renderItem = ({ item }: { item: Contacts.Contact }) => (
    <View style={styles.contactItem}>
      <View style={styles.profileCircle}>
        <Text style={styles.profileInitial}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        {item.phoneNumbers && item.phoneNumbers.length > 0 ? (
          <Text style={styles.contactNumber}>
            {item.phoneNumbers.map(phone => phone.number).join(', ')}
          </Text>
        ) : (
          <Text style={styles.noNumber}>No phone number available</Text>
        )}
      </View>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('contactList.title')}</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id || Math.random().toString(36).substr(2, 9)}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight:'bold'
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileInitial: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
  },
  contactNumber: {
    fontSize: 16,
    color: '#555',
  },
  noNumber: {
    fontSize: 16,
    color: '#888',
  },
});

export default ContactsScreen;
