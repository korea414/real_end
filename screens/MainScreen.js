import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreen({ navigation }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.name);
      }
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate('MyPage')}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // 실제 프로필 이미지를 넣으세요
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.profileName}>{userName}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
            <Text style={styles.profileText}>마이 페이지로 이동</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Chatbot')}>
        <Text style={styles.cardTitle}>챗봇</Text>
        <Text style={styles.cardText}>챗봇과 대화를 통해 질병진단과 약 추천, 병원 추천까지 받아보세요!</Text>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>이동</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BloodPressure')}>
        <Text style={styles.cardTitle}>혈압 측정</Text>
        <Text style={styles.cardText}>AI를 통해 혈압을 측정합니다.</Text>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>이동</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ECG')}>
        <Text style={styles.cardTitle}>심전도 측정</Text>
        <Text style={styles.cardText}>애플워치를 통해 심전도를 측정합니다.</Text>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>이동</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('UrineTest')}>
        <Text style={styles.cardTitle}>소변 검사 판독기</Text>
        <Text style={styles.cardText}>AI를 통해 소변 검사를 판독합니다.</Text>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>이동</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 25,
    marginRight: 30,
  },
  profileName: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  profileText: {
    color: '#3366FF',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  cardText: {
    color: '#666',
    flex: 2,
  },
  cardButton: {
    backgroundColor: '#3366FF',
    borderRadius: 5,
    padding: 10,
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
