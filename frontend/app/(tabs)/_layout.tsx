import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '.';
import AddRating from './rate-place'
import { AuthStorage } from '@/utils/authStorage';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AuthStorage.getToken();
      setIsAuth(!!token);
    };
    checkAuth();
  }, []);

  if (isAuth === null) return null;

  if (!isAuth) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profil"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Noter"
        component={AddRating}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
