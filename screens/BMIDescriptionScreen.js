import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BMIDescriptionScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI 계산기</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>BMI란?</Text>
        <Text style={styles.sectionText}>
          BMI(Body Mass Index)는 체질량 지수를 의미하며, 체중(kg)을 신장(m)의 제곱으로 나누어 계산됩니다. 
          이는 비만도를 간단하게 측정할 수 있는 지표입니다.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>BMI 계산 방법</Text>
        <Text style={styles.sectionText}>
          BMI = 체중(kg) ÷ (신장(m) × 신장(m))
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BMICheck')}>
        <Text style={styles.buttonText}>계산하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
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
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007bff',
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

export default BMIDescriptionScreen;
