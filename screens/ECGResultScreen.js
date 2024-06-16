// ECGResultScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LineChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

export default function ECGResultScreen({ route, navigation }) {
  const { result, value, data } = route.params;

  const saveResult = async () => {
    try {
      const existingResults = await AsyncStorage.getItem('ecgResults');
      const results = existingResults ? JSON.parse(existingResults) : [];
      const newResult = {
        result,
        value,
        data,
        date: new Date().toLocaleString(),
      };
      results.push(newResult);
      await AsyncStorage.setItem('ecgResults', JSON.stringify(results));
      Alert.alert('성공', '결과가 저장되었습니다.');
    } catch (error) {
      Alert.alert('오류', '결과를 저장할 수 없습니다.');
    }
  };

  // 그래프 데이터 생성
  const graphData = Array.from({ length: 60 }, () => Math.floor(Math.random() * (100 - 60 + 1)) + 60);

  return (
    <View style={styles.container}>
      <Text>검사 결과: {result}</Text>
      <Text>측정된 값: {value}</Text>
      <LineChart
        style={{ height: 200, width: 300 }}
        data={graphData}
        svg={{ stroke: 'rgb(134, 65, 244)' }}
        contentInset={{ top: 20, bottom: 20 }}
        curve={shape.curveNatural}
      >
        <Grid />
      </LineChart>
      <TouchableOpacity onPress={saveResult} style={styles.button}>
        <Text style={styles.buttonText}>결과 저장</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ECG')} style={styles.button}>
        <Text style={styles.buttonText}>다시 검사</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.button}>
        <Text style={styles.buttonText}>메인 화면으로 돌아가기</Text>
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
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
});
