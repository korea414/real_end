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
import UrineTestScreen from './screens/UrineTestScreen';

const Stack = createStackNavigator();

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
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                <Text style={{ marginLeft: 15, color: '#007aff' }}>돌아가기</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="BloodPressure" component={BloodPressureScreen} />
        <Stack.Screen name="ECG" component={ECGScreen} />
        <Stack.Screen name="ECGResult" component={ECGResultScreen} />
        <Stack.Screen name="UrineTest" component={UrineTestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
