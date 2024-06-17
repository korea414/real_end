import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

export default function MainScreen({ navigation }) {
  const [userName, setUserName] = useState('');
  const sound = useRef(new Audio.Sound());

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.name);
      }
    };

    const playBackgroundMusic = async () => {
      try {
        await sound.current.loadAsync(require('../assets/sweden.mp3'));
        await sound.current.setIsLoopingAsync(true);
        await sound.current.playAsync();
      } catch (error) {
        console.error('Error loading sound', error);
      }
    };

    fetchUser();
    playBackgroundMusic();

    return () => {
      sound.current.stopAsync();
      sound.current.unloadAsync();
    };
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
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>챗봇</Text>
          <Text style={styles.cardText}>챗봇과 대화를 통해 질병진단과 약 추천, 병원 추천까지 받아보세요!</Text>
        </View>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>이동</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BloodPressureIntro')}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>혈압 측정</Text>
          <Text style={styles.cardText}>혈압기기의 데이터 출력 종이값을 통해 혈압을 측정합니다.</Text>
        </View>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>이동</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ECG')}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>심전도 측정</Text>
          <Text style={styles.cardText}>애플워치를 통해 심전도를 측정합니다.</Text>
        </View>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>이동</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BMIDescription')}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>BMI 지수 분석</Text>
          <Text style={styles.cardText}>체질량지수를 계산하여 개인의 체중 상태를 평가하고, 저체중, 정상체중, 과체중, 비만 등의 범주로 분류합니다.</Text>
        </View>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>이동</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DepressionIntro')}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>우울증 검사</Text>
          <Text style={styles.cardText}>우울증 검사를 합니다.</Text>
        </View>
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
    backgroundColor: '#f9f9f9',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    color: '#666',
    marginTop: 5,
  },
  cardButton: {
    backgroundColor: '#3366FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
