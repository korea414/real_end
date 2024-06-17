import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import CryptoJS from 'crypto-js';

export default function SignupScreen({ navigation }) {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!surname || !name || !gender || !username || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (gender !== 'M' && gender !== 'F') {
      Alert.alert('Error', 'Gender must be M or F');
      return;
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();
    const user = `${surname},${name},${gender},${username},${hashedPassword}\n`;
    const fileUri = FileSystem.documentDirectory + 'users.txt';

    try {
      console.log('Checking if user data file exists...');
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      
      let existingData = '';
      if (fileInfo.exists) {
        console.log('User data file exists, reading data...');
        existingData = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
        console.log('Existing data read successfully');
      } else {
        console.log('User data file does not exist, creating new file...');
      }

      const users = existingData.split('\n').filter(Boolean);
      const isUserExists = users.some(u => {
        const [,, , existingUsername] = u.split(',');
        return existingUsername === username;
      });

      if (isUserExists) {
        Alert.alert('Error', 'Username already exists');
        return;
      }

      const newData = existingData + user;
      console.log('Writing new user data...');
      await FileSystem.writeAsStringAsync(fileUri, newData, { encoding: FileSystem.EncodingType.UTF8 });
      console.log('New user data written successfully');
      Alert.alert('Success', 'User registered successfully', [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
    } catch (error) {
      console.log('Error occurred during signup:', error);
      Alert.alert('Error', 'Could not register user');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <TextInput
        style={styles.input}
        value={surname}
        onChangeText={setSurname}
        placeholder="Surname"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={gender}
        onChangeText={setGender}
        placeholder="Gender (M/F)"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSignup} style={styles.button}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#3366FF',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: '#3366FF',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 18,
    backgroundColor: '#E0E0FF',
    color: '#333',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#3366FF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
