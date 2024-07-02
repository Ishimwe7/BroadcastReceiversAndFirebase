import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useTheme } from './ThemeContext';

 interface LoginProps {
     onLogin: () => void; 
}
interface LoginFormData {
  email: string;
  password: string;
}
const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
    const [requiredFields, setRequiredFields] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const { theme } = useTheme();
    // const [user, setUser] = useState(null);
    const handleLogin = async() => {
        // Validate input fields
        if (!formData.email || !formData.password) {
            setSuccess('');
            setError('');
            setRequiredFields('All Fields are required !');
        }


        try {
            const response = await axios.post('https://todo-app-qw91.onrender.com/users/login', {
                formData
            });
            console.log(response);
            if (response.status === 200) {
                setRequiredFields('');
                setSuccess('Login Successfully !');
                setError('');
                setFormData({ email: '', password: '' });
                onLogin();
            }
            else {
                setError('Invalid Credentials ');
            }
        } catch (error) {
            setError('Login Failed!');
            setSuccess('');
        }
    };

 const handleSignIn = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(formData.email,formData.password);
        setUser(userCredential.user);
        if (user) {
            setRequiredFields('');
            setSuccess('Login Successfully !');
            setError('');
            setFormData({ email: '', password: '' });
            onLogin();
        }
        else {
            setError('Invalid Credentials ');
        }
    } catch (error) {
     setError('Login Failed!');
     setSuccess('');
     console.error(error);
    }
  };

    return (
        <View style={styles[theme].container}>
            <Text style={styles[theme].title}>Login</Text>
            
            <TextInput
                style={styles[theme].input}
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles[theme].input}
                placeholder="Password"
               // placeholderTextColor={styles[theme].placeholderColor}
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry
            />
            {requiredFields && <Text style={styles[theme].error}>{requiredFields}</Text>}
             {error && <Text style={styles[theme].error}>{error}</Text>}
            {success && <Text style={styles[theme].success}>{ success}</Text>}
            <TouchableOpacity style={styles[theme].button} onPress={handleSignIn}>
                <Text style={styles[theme].buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles[theme].account}>Don't have an account ? Register</Text>
        </View>
    );
}

const styles = {
  light: StyleSheet.create({
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
     placeholderColor: {
        color:'#000'
    }
  }),
  dark: StyleSheet.create({
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
    placeholderColor: {
        color:'#fff'
    }
  }),
};

export default Login;