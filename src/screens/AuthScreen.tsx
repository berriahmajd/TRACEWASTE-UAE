import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

export default function AuthScreen({ navigation }: any) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<string>('');

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (!isLogin && (!name || !userType)) {
      Alert.alert('Error', 'Please complete all fields');
      return;
    }

    setLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email, password } : { email, password, name, userType };

      const response = await api.post(endpoint, payload);

      if (response.data.success) {
        const { token, userId, userName } = response.data.data;
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('userName', userName);
        navigation.replace('MainApp');
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-gradient-to-b from-green-50 to-white">
      <View className="px-6 py-12">
        <Text className="text-4xl font-bold text-center text-green-600 mb-2">
          TRACEWASTE
        </Text>
        <Text className="text-center text-gray-600 mb-8">
          Tracking waste for a sustainable UAE
        </Text>

        {!isLogin && (
          <>  
            <Text className="text-gray-700 font-semibold mb-2">Full Name</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 mb-4 text-gray-800"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />

            <Text className="text-gray-700 font-semibold mb-2">User Type</Text>
            <View className="gap-2 mb-4">
              {['individual', 'residence', 'villa', 'office', 'company', 'factory'].map((type) => (
                <TouchableOpacity
                  key={type}
                  className={`p-3 rounded-lg border ${
                    userType === type
                      ? 'bg-green-600 border-green-600'
                      : 'bg-white border-gray-300'
                  }`}
                  onPress={() => setUserType(type)}
                >
                  <Text
                    className={`$'
                      userType === type ? 'text-white' : 'text-gray-700'
                    } capitalize font-semibold`}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <Text className="text-gray-700 font-semibold mb-2">Email</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4 text-gray-800"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-gray-700 font-semibold mb-2">Password</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-6 text-gray-800"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-green-600 p-4 rounded-lg mb-4"
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-bold text-lg">
              {isLogin ? 'Login' : 'Create Account'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text className="text-center text-blue-600 font-semibold">
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}