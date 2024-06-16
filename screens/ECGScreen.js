// ECGScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

export default function ECGScreen({ navigation }) {
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [data, setData] = useState([0]);

  useEffect(() => {
    let interval;
    if (isMeasuring) {
      interval = setInterval(() => {
        setData(prevData => [...prevData.slice(-30), Math.random() * 100]);
      }, 500); // 0.5초마다 데이터 추가
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isMeasuring]);

  const startMeasurement = () => {
    setIsMeasuring(true);
    setTimeout(() => {
      const randomResult = Math.floor(Math.random() * (120 - 60 + 1)) + 60; // 60 ~ 120 범위의 랜덤 값
      let resultText = '정상';
      if (randomResult > 100) resultText = '위험';
      setIsMeasuring(false);
      navigation.navigate('ECGResult', { result: resultText, value: randomResult, data });
    }, 30000); // 30초 후 결과 표시
  };

  return (
    <View style={styles.container}>
      {isMeasuring ? (
        <>
          <Text>검사 중...</Text>
          <LineChart
            style={{ height: 200, width: 300 }}
            data={data}
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20 }}
            curve={shape.curveNatural}
          >
            <Grid />
          </LineChart>
        </>
      ) : (
        <View>
          <Text style={styles.instruction}>카메라 뒷쪽에 손가락을 갖다 대세요.</Text>
          <TouchableOpacity onPress={startMeasurement} style={styles.button}>
            <Text style={styles.buttonText}>심전도 측정하기</Text>
          </TouchableOpacity>
        </View>
      )}
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
  instruction: {
    fontSize: 18,
    margin: 20,
    textAlign: 'center',
  },
});
