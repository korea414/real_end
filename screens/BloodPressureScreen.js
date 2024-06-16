// BloodPressureScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, FlatList, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BloodPressureScreen({ navigation }) {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [records, setRecords] = useState([
    {
      systolic: 120,
      diastolic: 80,
      status: '정상',
      advice: '혈압이 정상 범위입니다. 건강을 유지하세요!',
      timestamp: new Date().toLocaleString(),
    },
  ]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const savedRecords = await AsyncStorage.getItem('records');
      if (savedRecords) {
        setRecords(JSON.parse(savedRecords));
      }
    } catch (error) {
      console.error('Failed to load records:', error);
    }
  };

  const saveRecords = async (newRecords) => {
    try {
      await AsyncStorage.setItem('records', JSON.stringify(newRecords));
    } catch (error) {
      console.error('Failed to save records:', error);
    }
  };

  const saveLatestRecord = async (record) => {
    try {
      await AsyncStorage.setItem('latestRecord', JSON.stringify(record));
    } catch (error) {
      console.error('Failed to save the latest record:', error);
    }
  };

  const clearRecords = async () => {
    try {
      const newRecords = records.slice(0, 1); // 첫 번째 데이터만 남기고 나머지 삭제
      setRecords(newRecords);
      await AsyncStorage.setItem('records', JSON.stringify(newRecords));
      await AsyncStorage.removeItem('latestRecord'); // 최신 기록 삭제
    } catch (error) {
      console.error('Failed to clear records:', error);
    }
  };

  const analyzeBloodPressure = () => {
    const sys = parseInt(systolic);
    const dia = parseInt(diastolic);

    let status = '';
    let advice = '';
    if (sys < 90 && dia < 60) {
      status = '저혈압 2단계';
      advice = '즉시 의사와 상담하세요.';
    } else if (sys < 100 && dia < 65) {
      status = '저혈압 1단계';
      advice = '주의가 필요합니다. 의사와 상담하고 생활 습관을 개선하세요.';
    } else if (sys < 110 && dia < 70) {
      status = '저혈압 전단계';
      advice = '약간의 주의가 필요합니다. 식단과 생활 습관을 개선하세요.';
    } else if (sys < 120 && dia < 80) {
      status = '정상';
      advice = '혈압이 정상 범위입니다. 건강을 유지하세요!';
    } else if ((sys >= 120 && sys <= 139) || (dia >= 80 && dia <= 89)) {
      status = '고혈압 전단계';
      advice = '주의가 필요합니다. 식단과 생활 습관을 개선하세요.';
    } else if ((sys >= 140 && sys <= 159) || (dia >= 90 && dia <= 99)) {
      status = '고혈압 1단계';
      advice = '의사와 상담하고 생활 습관을 개선하세요.';
    } else if (sys >= 160 || dia >= 100) {
      status = '고혈압 2단계';
      advice = '즉시 의사와 상담하세요.';
    } else {
      status = '혈압 값을 확인해주세요';
      advice = '올바른 혈압 값을 입력해주세요.';
    }

    const newRecord = {
      systolic: sys,
      diastolic: dia,
      status: status,
      advice: advice,
      timestamp: new Date().toLocaleString(),
    };

    const newRecords = [...records, newRecord];
    setRecords(newRecords);
    setSystolic('');
    setDiastolic('');
    saveRecords(newRecords);
    saveLatestRecord(newRecord); // Save the latest record
  };

  const chartData = {
    labels: records.map((record) => record.timestamp.split(' ')[1]), // 시간 부분만 표시
    datasets: [
      {
        data: records.map((record) => record.systolic),
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // 수축기 혈압 - 파란색
        strokeWidth: 2,
        label: 'Systolic',
      },
      {
        data: records.map((record) => record.diastolic),
        color: (opacity = 1) => `rgba(255, 45, 85, ${opacity})`, // 이완기 혈압 - 빨간색
        strokeWidth: 2,
        label: 'Diastolic',
      },
    ],
    legend: ['Systolic', 'Diastolic'],
  };

  const openModal = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRecord(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Systolic"
          keyboardType="numeric"
          value={systolic}
          onChangeText={setSystolic}
        />
        <TextInput
          style={styles.input}
          placeholder="Diastolic"
          keyboardType="numeric"
          value={diastolic}
          onChangeText={setDiastolic}
        />
        <TouchableOpacity style={styles.button} onPress={analyzeBloodPressure}>
          <Text style={styles.buttonText}>Analyze</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearRecords}>
          <Text style={styles.clearButtonText}>Clear Data</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>Date: {item.timestamp}</Text>
              <Text style={styles.resultText}>Systolic: {item.systolic}</Text>
              <Text style={styles.resultText}>Diastolic: {item.diastolic}</Text>
              <Text style={styles.resultText}>Status: {item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.list}
      />
      <ScrollView>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 32} // Adjust width for padding
          height={160}
          yAxisInterval={1} // 30 단위로 눈금선을 설정
          yLabelsOffset={24}
          chartConfig={{
            backgroundColor: '#f2f2f2',
            backgroundGradientFrom: '#f2f2f2',
            backgroundGradientTo: '#f2f2f2',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#007aff',
            },
            propsForBackgroundLines: {
              strokeDasharray: '', // 이 속성을 설정하면 점선이 아닌 실선으로 표시됩니다.
            },
          }}
          yLabels={['0', '30', '60', '90', '120', '150', '180', '210']} // Y축 레이블
          bezier
          style={{
            marginVertical: 5,
            borderRadius: 10,
            marginTop: '8%', // 그래프를 아래로 내리기 위해 추가
          }}
        />
        <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.mainButtonText}>메인스크린으로 돌아가기</Text>
        </TouchableOpacity>
      </ScrollView>
      {selectedRecord && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Blood Pressure Details</Text>
              <Text style={styles.modalText}>Date: {selectedRecord.timestamp}</Text>
              <Text style={styles.modalText}>Systolic: {selectedRecord.systolic}</Text>
              <Text style={styles.modalText}>Diastolic: {selectedRecord.diastolic}</Text>
              <Text style={styles.modalText}>Status: {selectedRecord.status}</Text>
              <Text style={styles.modalText}>Advice: {selectedRecord.advice}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 40,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#007aff',
  },
  inputContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    height: 40,  // 입력 필드의 세로 길이 줄임
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007aff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  mainButton: {
    backgroundColor: '#007aff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    backgroundColor: '#fff',
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: '#007aff',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#007aff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
