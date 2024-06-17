import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import MainScreen from './screens/MainScreen';
import MyPageScreen from './screens/MyPageScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import BloodPressureScreen from './screens/BloodPressureScreen';
import ECGScreen from './screens/ECGScreen';
import ECGResultScreen from './screens/ECGResultScreen';
import BMI from './screens/BMI';
import LoadingScreen from './screens/LoadingScreen';
import ResultScreen from './screens/ResultScreen';
import DepressionTestScreen from './screens/DepressionTestScreen';
import DepressionResultScreen from './screens/DepressionResultScreen';
import DepressionIntroScreen from './screens/DepressionIntroScreen';
import BMIDescriptionScreen from './screens/BMIDescriptionScreen';
import BloodPressureIntroScreen from './screens/BloodPressureIntroScreen';

const Stack = createStackNavigator();

const screenOptionsWithBackButton = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.navigate('Main')}>
      <Text style={{ marginLeft: 15, color: '#007aff' }}>돌아가기</Text>
    </TouchableOpacity>
  ),
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerLeft: null, // Hides the back button globally
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="MyPage" component={MyPageScreen} />
        <Stack.Screen 
          name="Chatbot" 
          component={ChatbotScreen} 
          options={screenOptionsWithBackButton}
        />
        <Stack.Screen 
          name="BloodPressureIntro" 
          component={BloodPressureIntroScreen}
          options={screenOptionsWithBackButton}
        />
        <Stack.Screen 
          name="BloodPressure" 
          component={BloodPressureScreen}
          options={screenOptionsWithBackButton}
        />
        <Stack.Screen 
          name="ECG" 
          component={ECGScreen}
          options={screenOptionsWithBackButton}
        />
        <Stack.Screen 
          name="ECGResult" 
          component={ECGResultScreen}
          options={screenOptionsWithBackButton}
        />
        <Stack.Screen 
          name="BMIDescription" 
          component={BMIDescriptionScreen}
          options={screenOptionsWithBackButton}
        />
        <Stack.Screen 
          name="BMICheck" 
          component={BMI}
          options={screenOptionsWithBackButton}
        />
        <Stack.Screen 
          name="Loading" 
          component={LoadingScreen}
          options={screenOptionsWithBackButton}
        />
        <Stack.Screen 
          name="Result" 
          component={ResultScreen}
          options={screenOptionsWithBackButton}
        />
        <Stack.Screen 
          name="DepressionIntro" 
          component={DepressionIntroScreen}
          options={screenOptionsWithBackButton}
        />
        <Stack.Screen 
          name="DepressionTest" 
          component={DepressionTestScreen}
          options={screenOptionsWithBackButton}
        />
        <Stack.Screen 
          name="DepressionResult" 
          component={DepressionResultScreen}
          options={screenOptionsWithBackButton}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
