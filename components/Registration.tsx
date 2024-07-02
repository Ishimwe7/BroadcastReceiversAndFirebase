import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useTheme } from './ThemeContext';

interface RegisterFormData {
  names: string;
  email: string;
  password: string;
  dob: Date | null;
}
export default function Registration() {
    const [formData, setFormData] = useState<RegisterFormData>({ names: '', email: '', password: '', dob:null});
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMismatch, setPasswordMismatch] = useState('');
    const [requiredFields, setRequiredFields] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Choose Date');
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const { theme } = useTheme();

  const onChange = (event:React.ChangeEvent, selectedDate:Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setText(format(currentDate, 'yyyy-MM-dd')); 
  };

  const showDatepicker = () => {
    setShow(true);
  };

    const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

    const handleRegistration = async() => {
        
        // Validate input fields
        if (!formData.names || !formData.email || !formData.password || !confirmPassword) {
            setSuccess('');
            setPasswordMismatch('');
            setError('');
            setInvalidEmail('');
            setRequiredFields('All Fields are required !');
            return;
        }
        if (!validateEmail(formData.email)) {
           setSuccess('');
           setRequiredFields('');
           setPasswordMismatch('');
            setError('');
           setInvalidEmail('Invalid email address!');
           return;
        }

        if (formData.password !== confirmPassword) {
            setSuccess('');
            setRequiredFields('');
            setInvalidEmail('');
            setError('');
            setPasswordMismatch('Password Mismatches !');
            return;
        }

         try {
            const response = await axios.post('https://todo-app-qw91.onrender.com/users/register', {
                formData
            });
             if (response.status === 200) {
                setConfirmPassword('');
                setRequiredFields('');
                setPasswordMismatch('');
                setError('');
                setFormData({ names: '', email: '', password: '',dob: null});
                setSuccess('Registration Done Successfully !');
             }
             else {
                 setConfirmPassword('');
                 setRequiredFields('');
                 setPasswordMismatch('');
                 setSuccess('');
                 setError('Registration Failed !');
             }
         } catch (error) {
            setConfirmPassword('');
            setRequiredFields('');
            setPasswordMismatch('');
            setSuccess('');
            setError('Registration Failed!');
        }
    };

     const handleSignUp = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(formData.email, formData.password);
        setUser(userCredential.user);
        if (user) {
             setConfirmPassword('');
             setRequiredFields('');
             setPasswordMismatch('');
             setError('');
             setFormData({ names: '', email: '', password: '',dob: null});
             setSuccess('Registration Done Successfully !');
        }
        else {
             setConfirmPassword('');
             setRequiredFields('');
             setPasswordMismatch('');
             setSuccess('');
             setError('Registration Failed !');
        }
    } catch (error) {
        setConfirmPassword('');
        setRequiredFields('');
        setPasswordMismatch('');
        setSuccess('');
        setError('Registration Failed!');
      console.error(error);
    }
  };

    return (
        <View style={styles[theme].container}>
            <Text style={styles[theme].title}>Registration</Text>
            
            <TextInput
                style={styles[theme].input}
                placeholder="Name"
                value={formData.names} onChangeText={(text) => setFormData({ ...formData, names: text })}
                autoCapitalize="words"
            />
            <TextInput
                style={styles[theme].input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <View style={styles[theme].birthdate}>
                <Text>Birth-Date: </Text>
                <Text>{text} </Text>
                <TouchableOpacity onPress={showDatepicker} style={{ marginBottom: 20 }}>
                    <Icon name="calendar" size={20} color="black" style={styles[theme].icon} />
                </TouchableOpacity>
            </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={()=>onChange}
        />
            )}
             <TextInput
                style={styles[theme].input}
                placeholder="Password"
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry
            />
            <TextInput
                style={styles[theme].input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            {requiredFields && <Text style={styles[theme].error}>{requiredFields}</Text>}
            {invalidEmail && <Text style={styles[theme].error}>{invalidEmail}</Text>}
            {passwordMismatch && <Text style={styles[theme].error}>{passwordMismatch}</Text>}
            {error&& <Text style={styles[theme].error}>{ error}</Text>}
            {success && <Text style={styles[theme].success}>{ success}</Text>}

            <TouchableOpacity style={styles[theme].button} onPress={handleSignUp}>
                <Text style={styles[theme].buttonText}>Register</Text>
            </TouchableOpacity>
            <Text style={styles[theme].account}>Already have an account ? Login</Text>
        </View>
    );
}

const styles = {
  light: StyleSheet.create({
    birthdate: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 30,
      height: 50,
      borderColor: '#ccc',
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#000',
    },
    icon: {
      marginLeft: 10,
      color: '#000',
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 30,
      paddingHorizontal: 20,
      marginBottom: 10,
      color: '#000',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: 'tomato',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      marginTop: 20,
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
    account: {
      fontSize: 18,
      marginTop: 20,
      color: '#000',
    },
    error: {
      fontSize: 18,
      color: 'red',
    },
    success: {
      fontSize: 18,
      color: 'green',
    },
  }),
  dark: StyleSheet.create({
    birthdate: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 30,
      height: 50,
      borderColor: '#555',
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#333',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#fff',
    },
    icon: {
      marginLeft: 10,
      color: '#fff',
    },
    input: {
      width: '100%',
      height: 50,
      borderWidth: 1,
      borderColor: '#555',
      borderRadius: 30,
      paddingHorizontal: 20,
      marginBottom: 10,
      color: '#fff',
    },
    button: {
      width: '100%',
      height: 50,
      backgroundColor: 'tomato',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      marginTop: 20,
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
    account: {
      fontSize: 18,
      marginTop: 20,
      color: '#fff',
    },
    error: {
      fontSize: 18,
      color: 'red',
    },
    success: {
      fontSize: 18,
      color: 'green',
    },
  }),
};