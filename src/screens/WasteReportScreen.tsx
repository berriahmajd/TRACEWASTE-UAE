import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { WasteType, WasteFrequency } from '../types';

export default function WasteReportScreen() {
  const [wasteType, setWasteType] = useState<WasteType>('plastic');
  const [frequency, setFrequency] = useState<WasteFrequency>('weekly');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const wasteTypes: WasteType[] = [
    'plastic',
    'paper',
    'organic',
    'metal',
    'glass',
    'electronic',
    'textile',
    'hazardous',
  ];

  const frequencies: WasteFrequency[] = ['once', 'daily', 'weekly', 'monthly'];

  useEffect(() => {
    getLocation();
    requestCameraPermission();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
      }
    } catch (error) {
      console.error('Location error:', error);
    }
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission', 'Camera permission is required');
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSubmit = async () => {
    if (!quantity) {
      Alert.alert('Error', 'Please enter waste quantity');
      return;
    }

    if (!location) {
      Alert.alert('Error', 'Location not available');
      return;
    }

    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      const formData = new FormData();
      
      formData.append('userId', userId || '');
      formData.append('wasteType', wasteType);
      formData.append('quantity', quantity);
      formData.append('frequency', frequency);
      formData.append('description', description);
      formData.append('latitude', location.latitude);
      formData.append('longitude', location.longitude);

      if (photo) {
        formData.append('photo', {
          uri: photo,
          type: 'image/jpeg',
          name: 'waste-report.jpg',
        } as any);
      }

      const response = await api.post('/waste/report', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        Alert.alert('Success', 'Waste report submitted!');
        // Reset form
        setWasteType('plastic');
        setFrequency('weekly');
        setQuantity('');
        setDescription('');
        setPhoto(null);
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="px-6 py-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">Report Waste</Text>

        {/* Waste Type */}
        <Text className="text-gray-700 font-semibold mb-3">Type of Waste</Text>
        <View className="gap-2 mb-6">
          {wasteTypes.map((type) => (
            <TouchableOpacity
              key={type}
              className={`p-3 rounded-lg border ${
                wasteType === type
                  ? 'bg-green-600 border-green-600'
                  : 'bg-gray-50 border-gray-300'
              }`}
              onPress={() => setWasteType(type)}
            >
              <Text
                className={`${
                  wasteType === type ? 'text-white' : 'text-gray-700'
                } capitalize font-semibold`}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Frequency */}
        <Text className="text-gray-700 font-semibold mb-3">Disposal Frequency</Text>
        <View className="gap-2 mb-6">
          {frequencies.map((freq) => (
            <TouchableOpacity
              key={freq}
              className={`p-3 rounded-lg border ${
                frequency === freq
                  ? 'bg-blue-600 border-blue-600'
                  : 'bg-gray-50 border-gray-300'
              }`}
              onPress={() => setFrequency(freq)}
            >
              <Text
                className={`$`
                  frequency === freq ? 'text-white' : 'text-gray-700'
                } capitalize font-semibold`}
              >
                {freq}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quantity */}
        <Text className="text-gray-700 font-semibold mb-2">Quantity (kg)</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-6 text-gray-800"
          placeholder="Enter quantity in kg"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="decimal-pad"
        />

        {/* Description */}
        <Text className="text-gray-700 font-semibold mb-2">Description</Text>
        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-6 text-gray-800"
          placeholder="Additional details (optional)"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        {/* Photo */}
        <Text className="text-gray-700 font-semibold mb-3">Photo (Recommended)</Text>
        {photo && (
          <Image
            source={{ uri: photo }}
            className="w-full h-48 rounded-lg mb-3"
          />
        )}
        <TouchableOpacity
          className="bg-gray-300 p-4 rounded-lg mb-6"
          onPress={pickImage}
        >
          <Text className="text-center text-gray-700 font-semibold">
            📸 Take Photo
          </Text>
        </TouchableOpacity>

        {/* Submit */}
        <TouchableOpacity
          className="bg-green-600 p-4 rounded-lg"
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white text-center font-bold text-lg">
              Submit Report
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}