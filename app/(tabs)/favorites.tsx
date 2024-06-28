import { useTheme } from '@/ThemeContext';
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const HomeScreen = () => {
    const { darkMode } = useTheme();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: darkMode ? '#000' : '#fff' }}>
        </SafeAreaView>
    );
};

export default HomeScreen;
