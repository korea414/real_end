// screens/LoadingScreen.js
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingScreen = ({ navigation, route }) => {
  const { height, weight } = route.params;

  useEffect(() => {
    setTimeout(() => {
      const heightInMeters = parseFloat(height) / 100;
      const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);
      navigation.navigate('Result', { bmi });
    }, 30000);
  }, [navigation, height, weight]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>측정중입니다...</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default LoadingScreen;
