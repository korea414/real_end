import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DepressionIntroScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>우울증 검사를 시작합니다</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>검사 주의사항</Text>
        <Text style={styles.sectionText}>1. 솔직하게 답변하세요.</Text>
        <Text style={styles.sectionText}>2. 최근 2주간의 상태를 기준으로 답변하세요.</Text>
        <Text style={styles.sectionText}>3. 가능한 한 신속하게 답변하세요.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>이모티콘의 의미</Text>
        <Text style={styles.sectionText}>😡: 전혀 그렇지 않다</Text>
        <Text style={styles.sectionText}>😟: 그렇지 않다</Text>
        <Text style={styles.sectionText}>😐: 보통이다</Text>
        <Text style={styles.sectionText}>🙂: 그렇다</Text>
        <Text style={styles.sectionText}>😃: 매우 그렇다</Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('DepressionTest')}>
        <Text style={styles.buttonText}>검사 시작</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.buttonText}>홈으로 나가기</Text>
      </TouchableOpacity>
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
  startButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  homeButton: {
    backgroundColor: '#28a745',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});

export default DepressionIntroScreen;
