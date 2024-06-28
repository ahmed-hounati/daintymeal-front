import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const loadDarkMode = async () => {
            try {
                const value = await AsyncStorage.getItem('darkMode');
                if (value !== null) {
                    setDarkMode(JSON.parse(value));
                }
            } catch (e) {
                console.error(e);
            }
        };
        loadDarkMode();
    }, []);

    const toggleDarkMode = async () => {
        try {
            const newDarkMode = !darkMode;
            setDarkMode(newDarkMode);
            await AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);