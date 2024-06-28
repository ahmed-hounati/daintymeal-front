import Colors from '@/constants/Colors';
import { Tabs } from 'expo-router';
import React from 'react';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/ThemeContext';
import { View } from 'react-native';

const Layout = () => {

  const { t } = useTranslation();
  const { darkMode, toggleDarkMode } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: darkMode ? '#000' : '#fff' }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary,
          tabBarLabelStyle: {
            fontFamily: 'mon-sb',
          },
          tabBarStyle: {
            marginBottom: 15,
            marginHorizontal: 10,
            borderRadius: 15,
            backgroundColor: darkMode ? '#000' : '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarLabel: t('Home'),
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="trending"
          options={{
            headerShown: false,
            tabBarLabel: t('Trending'),
            tabBarIcon: ({ color, size }) => (
              <Feather name="map-pin" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="middle"
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <TouchableOpacity onPress={undefined}>
                <Image
                  source={require('../../assets/images/nav-logo.png')}
                  style={styles.middleTabIcon}
                />
              </TouchableOpacity>
            ),
            tabBarStyle: {
              display: 'none',
            },
          }}
        />

        <Tabs.Screen
          name="favorites"
          options={{
            tabBarLabel: t('Favorites'),
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarLabel: t('Profile'),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  middleTabIcon: {
    width: 50,
    height: 65,
  },
});