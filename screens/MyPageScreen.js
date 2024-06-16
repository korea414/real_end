// MyPageScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

export default function MyPageScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [latestRecord, setLatestRecord] = useState(null);
  const [ecgResults, setEcgResults] = useState([]);
  const [bloodPressureRecords, setBloodPressureRecords] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    const fetchLatestRecord = async () => {
      const recordData = await AsyncStorage.getItem('latestRecord');
      if (recordData) {
        setLatestRecord(JSON.parse(recordData));
      }
    };

    const fetchEcgResults = async () => {
      const results = await AsyncStorage.getItem('ecgResults');
      if (results) {
        setEcgResults(JSON.parse(results));
      }
    };

    const fetchBloodPressureRecords = async () => {
      const bpRecords = await AsyncStorage.getItem('records');
      if (bpRecords) {
        setBloodPressureRecords(JSON.parse(bpRecords));
      }
    };

    fetchUser();
    fetchLatestRecord();
    fetchEcgResults();
    fetchBloodPressureRecords();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('records'); // 로그아웃 시 기록 삭제
    await AsyncStorage.removeItem('latestRecord'); // 로그아웃 시 최신 기록 삭제
    await AsyncStorage.removeItem('ecgResults'); // 로그아웃 시 심전도 결과 삭제
    navigation.navigate('Login');
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      '회원탈퇴',
      '정말로 회원탈퇴를 하시겠습니까?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: async () => {
            const fileUri = FileSystem.documentDirectory + 'users.txt';
            try {
              const existingData = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.UTF8 });
              const users = existingData.split('\n').filter(Boolean);
              const filteredUsers = users.filter(u => {
                const [surname, name, gender, username, hashedPassword] = u.split(',');
                return username !== user.username;
              });
              await FileSystem.writeAsStringAsync(fileUri, filteredUsers.join('\n'), { encoding: FileSystem.EncodingType.UTF8 });
              await AsyncStorage.clear(); // 모든 데이터를 삭제
              navigation.navigate('Login');
            } catch (error) {
              Alert.alert('Error', 'Could not delete account');
            }
          }
        }
      ]
    );
  };

  if (!user) {
    return null; // or some loading indicator
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.exitButton} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.exitButtonText}>나가기</Text>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // 실제 프로필 이미지를 넣으세요
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.nickname}>{`${user.surname} ${user.name}`}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.deleteButtonText}>회원탈퇴</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <Text style={styles.recentDiagnosisTitle}>회원 정보</Text>
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>성: {user.surname}</Text>
        <Text style={styles.userInfoText}>이름: {user.name}</Text>
        <Text style={styles.userInfoText}>성별: {user.gender}</Text>
        <Text style={styles.userInfoText}>가입일: {user.signupDate}</Text>
      </View>
      <Text style={styles.recentDiagnosisTitle}>심전도 검사 결과</Text>
      <FlatList
        data={ecgResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>날짜: {item.date}</Text>
            <Text style={styles.resultText}>결과: {item.result}</Text>
            <Text style={styles.resultText}>값: {item.value}</Text>
          </View>
        )}
      />
      <Text style={styles.recentDiagnosisTitle}>혈압 측정 결과</Text>
      <FlatList
        data={bloodPressureRecords}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>날짜: {item.timestamp}</Text>
            <Text style={styles.resultText}>수축기 혈압: {item.systolic}</Text>
            <Text style={styles.resultText}>이완기 혈압: {item.diastolic}</Text>
            <Text style={styles.resultText}>상태: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  exitButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#3366FF',
    padding: 10,
    borderRadius: 5,
  },
  exitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  nickname: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  recentDiagnosisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userInfo: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 5,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  resultContainer: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  resultText: {
    fontSize: 15,
    marginVertical: 2,
    color: '#333',
  },
});
