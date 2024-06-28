import { useTheme } from '@/ThemeContext';
import FeaturedItems from '@/components/FeaturedItems';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    const { darkMode } = useTheme();
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: darkMode ? '#000' : '#fff'
        }}>
            <FeaturedItems />
        </SafeAreaView>
    );
};


export default HomeScreen;
