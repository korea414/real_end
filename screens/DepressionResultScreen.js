import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DepressionResultScreen = ({ route, navigation }) => {
  const { totalScore } = route.params;
  let diagnosis = '정상';
  let advice = '계속해서 건강한 생활을 유지하세요.';

  if (totalScore >= 20 && totalScore < 40) {
    diagnosis = '가벼운 우울증';
    advice = '스트레스 관리를 하고, 필요시 전문가와 상담하세요.';
  } else if (totalScore >= 40 && totalScore < 60) {
    diagnosis = '중등도 우울증';
    advice = '전문가의 도움을 받으세요.';
  } else if (totalScore >= 60) {
    diagnosis = '심각한 우울증';
    advice = '즉시 전문가의 도움을 받으세요.';
  }

  const handleSaveResult = async () => {
    const newRecord = {
      date: new Date().toLocaleString(),
      totalScore,
      diagnosis,
      advice
    };
    try {
      const savedRecords = await AsyncStorage.getItem('depressionRecords');
      const records = savedRecords ? JSON.parse(savedRecords) : [];
      records.push(newRecord);
      await AsyncStorage.setItem('depressionRecords', JSON.stringify(records));
      alert('결과가 저장되었습니다.');
    } catch (error) {
      alert('결과를 저장하는 데 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>우울증 검사 결과</Text>
      <Text style={styles.resultText}>총 점수: {totalScore}</Text>
      <Text style={styles.resultText}>진단: {diagnosis}</Text>
      <Text style={styles.adviceText}>{advice}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSaveResult}>
        <Text style={styles.buttonText}>결과 저장</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.buttonText}>홈으로 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  adviceText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});

export default DepressionResultScreen;
