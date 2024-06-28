import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, I18nManager } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useTranslation } from 'react-i18next';
import { Stack } from 'expo-router';
import useAppRestart from '@/hooks/useAppRestart';
import { ThemeProvider } from '@/ThemeContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { i18n } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const { key, restartApp } = useAppRestart();
  const [fontsLoaded] = useFonts({
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage) {
          await i18n.changeLanguage(savedLanguage);
          handleLanguageChange(savedLanguage);
        }
        setLoaded(true);
      } catch (error) {
        console.error('Error loading language:', error);
        setLoaded(true);
      }
    };
    loadLanguage();
  }, [i18n]);

  const handleLanguageChange = async (language: string) => {
    const isRTL = language === 'ar';
    if (isRTL !== I18nManager.isRTL) {
      I18nManager.forceRTL(isRTL);
    }
  };

  useEffect(() => {
    const saveLanguage = async () => {
      try {
        await AsyncStorage.setItem('language', i18n.language);
      } catch (error) {
        console.error('Error saving language:', error);
      }
    };
    if (loaded) {
      saveLanguage();
      handleLanguageChange(i18n.language);
    }
  }, [i18n.language, loaded]);

  useEffect(() => {
    if (loaded && fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, fontsLoaded]);

  if (!loaded || !fontsLoaded) {
    return null;
  }

  const direction = i18n.language === 'ar' || i18n.language === 'fa' ? 'rtl' : 'ltr';

  return (
    <ThemeProvider>
      <View key={key} style={{ flex: 1, flexDirection: direction === 'ltr' ? 'row' : 'row-reverse' }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name='resto' options={{ headerShown: false }} />
          <Stack.Screen name='register' options={{ headerShown: false }} />
        </Stack>
      </View>
    </ThemeProvider>
  );
}
