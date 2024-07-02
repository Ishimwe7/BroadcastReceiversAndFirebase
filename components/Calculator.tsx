
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from './ThemeContext';

interface CalculatorProps {
  onLogout: () => void;
}
const Calculator: React.FC<CalculatorProps> = ({ onLogout}) => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const scrollViewRef = useRef<ScrollView>(null);
  const { theme } = useTheme();

  const handlePress = (value: string) => {
    setInput(input + value);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

    const formatResult = (num: number) => {
    const exponent = Math.floor(Math.log10(Math.abs(num)));
    const mantissa = (num / Math.pow(10, exponent)).toFixed(2);
    return `${mantissa} x 10^${exponent}`;
  };

  const handleEvaluate = () => {
    try {
      const evalResult = eval(input);
      const evalResultString = evalResult.toString();
      if (evalResultString.length > 9 || Math.abs(evalResult) >= Math.pow(10, 9)) {
        setResult(formatResult(evalResult));
      } else {
        setResult(evalResultString);
      }
    } catch (error) {
      setResult('Error');
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [input]);

  return (
    <View style={styles[theme].container}>
      <View style={styles[theme].logoutContainer}>
        <TouchableOpacity onPress={onLogout} style={styles[theme].logoutButton}>
          <Text style={styles[theme].logoutText}>Logout</Text>
          <Icon name="log-out-outline" size={30} color="tomato" />
        </TouchableOpacity>
      </View>
      <View style={styles[theme].calculator}>
        {result ? <Text style={styles[theme].resultText}>{result}</Text> : <Text>Results Will be displayed here !</Text>}

       <ScrollView 
        style={styles[theme].inputContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
        ref={scrollViewRef}
      >
        <Text style={styles[theme].inputText}>{input}</Text>
      </ScrollView>
      <View style={styles[theme].row}>
        <CalculatorButton label="1" onPress={() => handlePress('1')} />
        <CalculatorButton label="2" onPress={() => handlePress('2')} />
        <CalculatorButton label="3" onPress={() => handlePress('3')} />
        <CalculatorButton label="+" onPress={() => handlePress('+')} />
      </View>
      <View style={styles[theme].row}>
        <CalculatorButton label="4" onPress={() => handlePress('4')} />
        <CalculatorButton label="5" onPress={() => handlePress('5')} />
        <CalculatorButton label="6" onPress={() => handlePress('6')} />
        <CalculatorButton label="-" onPress={() => handlePress('-')} />
      </View>
      <View style={styles[theme].row}>
        <CalculatorButton label="7" onPress={() => handlePress('7')} />
        <CalculatorButton label="8" onPress={() => handlePress('8')} />
        <CalculatorButton label="9" onPress={() => handlePress('9')} />
        <CalculatorButton label="*" onPress={() => handlePress('*')} />
      </View>
      <View style={styles[theme].row}>
        <CalculatorButton label="0" onPress={() => handlePress('0')} />
        <CalculatorButton label="C" onPress={handleClear} />
        <CalculatorButton label="⌫" onPress={handleBackspace} />
        <CalculatorButton label="/" onPress={() => handlePress('/')} />
      </View>
      <View style={styles[theme].row}>
        <CalculatorButton label="(" onPress={() => handlePress('(')} />
        <CalculatorButton label=")" onPress={() => handlePress(')')} />
        <CalculatorButton label="." onPress={() => handlePress('.')} />
        <CalculatorButton label="=" onPress={handleEvaluate} />
      </View>
      </View>
    </View>
  );
};

interface CalculatorButtonProps {
  label: string;
  onPress: () => void;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ label, onPress }) => {
  const { theme } = useTheme();
   const isDigit = /[0-9]/.test(label);
  return (
    <TouchableOpacity style={styles[theme].button} onPress={onPress}>
      <Text style={[styles[theme].buttonText, isDigit ? styles[theme].digitText : styles[theme].signText]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  light: StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      marginTop: 50,
    },
    calculator: {
      marginTop: 40,
      alignItems: 'center',
    },
    logoutContainer: {
      position: 'absolute',
      top: 0,
      right: 20,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    logoutText: {
      color: 'tomato',
      fontSize: 20,
      marginRight: 5,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    button: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 15,
      marginTop: 0,
      marginBottom: 0,
      borderRadius: 5,
      backgroundColor: '#fff',
    },
    digitText: {
      color: 'black',
      fontSize: 30,
    },
    signText: {
      color: 'green',
      fontSize: 30,
    },
    buttonText: {
      fontSize: 30,
    },
    inputContainer: {
      maxHeight: 60,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    inputText: {
      fontSize: 30,
      color: 'black',
      marginBottom: 20,
      textAlign: 'center',
      paddingRight: 15,
    },
    resultText: {
      fontSize: 40,
      color: 'green',
      marginBottom: 10,
    },
    placeholderText: {
      fontSize: 20,
      color: '#999',
    },
  }),
  dark: StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#333',
      marginTop: 50,
    },
    calculator: {
      marginTop: 40,
      alignItems: 'center',
    },
    logoutContainer: {
      position: 'absolute',
      top: 0,
      right: 20,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    logoutText: {
      color: 'tomato',
      fontSize: 20,
      marginRight: 5,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    button: {
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 15,
      marginTop: 0,
      marginBottom: 0,
      borderRadius: 5,
      backgroundColor: '#555',
    },
    digitText: {
      color: '#fff',
      fontSize: 30,
    },
    signText: {
      color: '#5fa',
      fontSize: 30,
    },
    buttonText: {
      fontSize: 30,
    },
    inputContainer: {
      maxHeight: 60,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    inputText: {
      fontSize: 30,
      color: '#fff',
      marginBottom: 20,
      textAlign: 'center',
      paddingRight: 15,
    },
    resultText: {
      fontSize: 40,
      color: '#5fa',
      marginBottom: 10,
    },
    placeholderText: {
      fontSize: 20,
      color: '#aaa',
    },
  }),
};
export default Calculator;
