import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useTheme } from '@/ThemeContext';

SplashScreen.preventAutoHideAsync();

export default function CustomSplashScreen() {
    const { darkMode } = useTheme();

    useEffect(() => {
        setTimeout(async () => {
            await SplashScreen.hideAsync();
        }, 2000);
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: darkMode ? '#000' : '#fff' }]}>
            <Image
                source={require('../assets/images/iphone-splash-preview.png')}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});