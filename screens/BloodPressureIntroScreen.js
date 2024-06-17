import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BloodPressureIntroScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>혈압 측정</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>혈압을 측정하기 전에</Text>
        <Text style={styles.sectionText}>1. 30분 전에는 카페인, 담배, 술을 피하세요.</Text>
        <Text style={styles.sectionText}>2. 측정 전에 5분 정도 편안하게 휴식을 취하세요.</Text>
        <Text style={styles.sectionText}>3. 측정 전에는 화장실을 다녀오세요.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>혈압 측정 시 주의사항</Text>
        <Text style={styles.sectionText}>1. 편안한 자세로 앉아 발을 바닥에 평평하게 두세요.</Text>
        <Text style={styles.sectionText}>2. 팔은 심장 높이에 두고 측정하세요.</Text>
        <Text style={styles.sectionText}>3. 측정 중에는 말을 하지 마세요.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.buttonText}>홈으로 나가기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BloodPressure')}>
          <Text style={styles.buttonText}>혈압 측정 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});

export default BloodPressureIntroScreen;
