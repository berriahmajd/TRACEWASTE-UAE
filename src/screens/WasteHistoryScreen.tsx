import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';
import { WasteReport } from '../types';

export default function WasteHistoryScreen() {
  const [reports, setReports] = useState<WasteReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await api.get(`/waste/reports/${userId}`);

      if (response.data.success) {
        setReports(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchReports();
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported':
        return 'bg-yellow-100 text-yellow-700';
      case 'collected':
        return 'bg-blue-100 text-blue-700';
      case 'recycled':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const renderReport = ({ item }: { item: WasteReport }) => (
    <View className="bg-white p-4 rounded-lg mb-3 border border-gray-200">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-bold text-gray-800 capitalize">
          {item.wasteType}
        </Text>
        <View className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}> 
          <Text className="text-xs font-semibold capitalize">
            {item.status}
          </Text>
        </View>
      </View>

      <Text className="text-gray-600 mb-1">
        Quantity: <Text className="font-semibold">{item.quantity} kg</Text>
      </Text>

      <Text className="text-gray-600 mb-1">
        Frequency: <Text className="font-semibold capitalize">{item.frequency}</Text>
      </Text>

      <Text className="text-gray-600 mb-1">
        Emirate: <Text className="font-semibold">{item.emirate}</Text>
      </Text>

      {item.description && (
        <Text className="text-gray-500 text-sm mb-2">
          {item.description}
        </Text>
      )}

      <Text className="text-gray-400 text-xs">
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={reports}
        renderItem={renderReport}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-12">
            <Text className="text-gray-500 text-lg">No waste reports yet</Text>
          </View>
        }
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}