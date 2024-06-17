import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarChart, StackedBarChart, ContributionGraph } from 'react-native-chart-kit';

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  formatYLabel: (yValue) => Math.round(yValue).toString(), // y축 레이블을 소수점 없이 표시
};

const ResultScreen = ({ route }) => {
  const { bmi } = route.params;
  const navigation = useNavigation();

  const handleSaveRecord = () => {
    // Save record logic here
    alert('기록이 저장되었습니다.');
  };

  const handleGoHome = () => {
    navigation.navigate('Main');
  };

  const handleRetakeTest = () => {
    navigation.navigate('UrineTest');
  };

  const screenWidth = Dimensions.get('window').width;

  const barData = {
    labels: ['저체중', '정상체중', '과체중', '비만', '고도비만'],
    datasets: [
      {
        data: [18, 23, 25, 30, 35],
        color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // 기준 값의 색상
        strokeDashArray: [5, 5], // 점선 처리
      },
      {
        data: Array(5).fill(bmi), // 사용자 BMI 값
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // 실제 값의 색상
      }
    ]
  };

  const stackedBarData = {
    labels: ['1분기', '2분기', '3분기', '4분기'],
    legend: ['남자', '여자', '사용자 BMI'],
    data: [
      [60, 60, Math.round(bmi)],
      [30, 30, Math.round(bmi)],
      [50, 50, Math.round(bmi)],
      [70, 70, Math.round(bmi)],
    ],
    barColors: ['#dfe4ea', '#ced6e0', '#ffa502'],
  };

  const contributionData = [
    { date: '2023-01-02', count: 1 },
    { date: '2023-01-03', count: 2 },
    { date: '2023-01-04', count: 3 },
    { date: '2023-01-05', count: 4 },
    { date: '2023-01-06', count: 5 },
    // 사용자의 BMI 값을 포함하여 데이터를 확장합니다.
    { date: '2023-01-07', count: bmi },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>BMI 결과</Text>
      </View>
      
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>BMI: {bmi.toFixed(2)}</Text>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Bar Chart</Text>
        <BarChart
          data={barData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Stacked Bar Chart</Text>
        <StackedBarChart
          data={stackedBarData}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
          hideLegend={true} // 수치값을 표시하지 않음
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Contribution Graph</Text>
        <ContributionGraph
          values={contributionData}
          endDate={new Date('2023-01-07')}
          numDays={105}
          width={screenWidth - 40}
          height={220}
          chartConfig={chartConfig}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSaveRecord}>
          <Text style={styles.buttonText}>기록 저장</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGoHome}>
          <Text style={styles.buttonText}>홈으로</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRetakeTest}>
          <Text style={styles.buttonText}>측정 다시하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 28,
    color: '#000',
  },
  chartContainer: {
    marginVertical: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
  },
  chartTitle: {
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ResultScreen;
