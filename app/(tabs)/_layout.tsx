import Colors from '@/constants/Colors';
import { Tabs } from 'expo-router';
import React from 'react';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

const Layout = () => {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarLabelStyle: {
        fontFamily: 'mon-sb',
      }
    }
    }>
      <Tabs.Screen name='index' options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />
      }} />

      <Tabs.Screen name='trending' options={{
        tabBarLabel: 'Trending',
        tabBarIcon: ({ color, size }) => <Feather name="map-pin" size={size} color={color} />
      }} />


      <Tabs.Screen name='favorites' options={{
        tabBarLabel: 'Favorites',
        tabBarIcon: ({ color, size }) => <Ionicons name="heart-outline" size={size} color={color} />
      }} />

      <Tabs.Screen name='explore' options={{
        tabBarLabel: 'Explore',
        tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />
      }} />


      <Tabs.Screen name='profile' options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" size={size} color={color} />
      }} />

    </Tabs>
  );
};

export default Layout