import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

export default function MyPageScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [latestRecord, setLatestRecord] = useState(null);
  const [latestEcgResult, setLatestEcgResult] = useState(null);
  const [latestBloodPressureRecord, setLatestBloodPressureRecord] = useState(null);
  const [latestDepressionRecord, setLatestDepressionRecord] = useState(null);
  const viewShotRef = useRef();

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

    const fetchLatestEcgResult = async () => {
      const results = await AsyncStorage.getItem('ecgResults');
      if (results) {
        const ecgResults = JSON.parse(results);
        if (ecgResults.length > 0) {
          setLatestEcgResult(ecgResults[ecgResults.length - 1]);
        }
      }
    };

    const fetchLatestBloodPressureRecord = async () => {
      const bpRecords = await AsyncStorage.getItem('records');
      if (bpRecords) {
        const bloodPressureRecords = JSON.parse(bpRecords);
        if (bloodPressureRecords.length > 0) {
          setLatestBloodPressureRecord(bloodPressureRecords[bloodPressureRecords.length - 1]);
        }
      }
    };

    const fetchLatestDepressionRecord = async () => {
      const depressionRecords = await AsyncStorage.getItem('depressionRecords');
      if (depressionRecords) {
        const records = JSON.parse(depressionRecords);
        if (records.length > 0) {
          setLatestDepressionRecord(records[records.length - 1]);
        }
      }
    };

    fetchUser();
    fetchLatestRecord();
    fetchLatestEcgResult();
    fetchLatestBloodPressureRecord();
    fetchLatestDepressionRecord();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
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

  const handleSaveToGallery = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (permission.granted) {
        await MediaLibrary.createAssetAsync(uri);
        Alert.alert('Success', 'Data saved to your gallery');
      } else {
        Alert.alert('Error', 'Permission to access gallery was denied');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save data to gallery');
    }
  };

  if (!user) {
    return null; // or some loading indicator
  }

  return (
    <ScrollView style={styles.container}>
      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
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
        {latestEcgResult ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>날짜: {latestEcgResult.date}</Text>
            <Text style={styles.resultText}>결과: {latestEcgResult.result}</Text>
            <Text style={styles.resultText}>값: {latestEcgResult.value}</Text>
          </View>
        ) : (
          <Text style={styles.noResultText}>심전도 검사 결과가 없습니다.</Text>
        )}
        <Text style={styles.recentDiagnosisTitle}>혈압 측정 결과</Text>
        {latestBloodPressureRecord ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>날짜: {latestBloodPressureRecord.timestamp}</Text>
            <Text style={styles.resultText}>수축기 혈압: {latestBloodPressureRecord.systolic}</Text>
            <Text style={styles.resultText}>이완기 혈압: {latestBloodPressureRecord.diastolic}</Text>
            <Text style={styles.resultText}>상태: {latestBloodPressureRecord.status}</Text>
          </View>
        ) : (
          <Text style={styles.noResultText}>혈압 측정 결과가 없습니다.</Text>
        )}
        <Text style={styles.recentDiagnosisTitle}>우울증 검사 결과</Text>
        {latestDepressionRecord ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>날짜: {latestDepressionRecord.date}</Text>
            <Text style={styles.resultText}>총 점수: {latestDepressionRecord.totalScore}</Text>
            <Text style={styles.resultText}>진단: {latestDepressionRecord.diagnosis}</Text>
            <Text style={styles.resultText}>상담: {latestDepressionRecord.advice}</Text>
          </View>
        ) : (
          <Text style={styles.noResultText}>우울증 검사 결과가 없습니다.</Text>
        )}
      </ViewShot>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveToGallery}>
        <Text style={styles.saveButtonText}>결과 저장</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginVertical: 10,
  },
  recentDiagnosisTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userInfo: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 5,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 8,
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
  noResultText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

