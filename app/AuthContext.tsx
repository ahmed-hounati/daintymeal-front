import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const getUserAuthStatus = async () => {
        const token = await AsyncStorage.getItem('access_token');
        return token !== null;
    };

    const getUserInfo = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        if (!accessToken) return null;

        const userCode = await AsyncStorage.getItem('user_code');

        if (!userCode) return null;

        try {
            const response = await fetch(`https://x2r9rfvwwi.execute-api.eu-north-1.amazonaws.com/dev/users/${userCode}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                return await response.json();
            } else {
                throw new Error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
            return null;
        }
    };

    const checkAuthStatus = async () => {
        const isLoggedIn = await getUserAuthStatus();
        setIsAuthenticated(isLoggedIn);

        if (isLoggedIn) {
            const user = await getUserInfo();
            setUserInfo(user);
        } else {
            setUserInfo(null);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, userInfo, checkAuthStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
