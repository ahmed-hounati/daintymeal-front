import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigationTypes'; // Adjust the path as necessary

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'index'>;

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<RegisterScreenNavigationProp>();

    const handleSignUp = async () => {
        try {
            console.log('Sending sign-up request with:', { username, email, password });

            const response = await fetch('https://x2r9rfvwwi.execute-api.eu-north-1.amazonaws.com/dev/auth/signup-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const signUpResponse = await response.json();
            console.log('Sign-up response:', signUpResponse);

            if (response.ok) {
                // Directly login the user after successful signup
                const loginResponse = await fetch('https://x2r9rfvwwi.execute-api.eu-north-1.amazonaws.com/dev/auth/login-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                });

                const loginResult = await loginResponse.json();
                console.log('Login response:', loginResult);

                if (loginResponse.ok) {
                    // Store the tokens and user code in AsyncStorage
                    await AsyncStorage.setItem('access_token', loginResult.access_token);
                    await AsyncStorage.setItem('refresh_token', loginResult.refresh_token);
                    await AsyncStorage.setItem('user_code', loginResult.user_code);

                    Alert.alert('Sign Up and Login Successful', 'You have been logged in.');
                    navigation.navigate('index');
                } else {
                    Alert.alert('Login Failed', loginResult.message || 'Please try again.');
                }
            } else {
                Alert.alert('Sign Up Failed', signUpResponse.message || 'Please try again.');
            }
        } catch (error) {
            console.error('Error during sign up or login:', error);
            Alert.alert('Error', 'An error occurred. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Video
                source={require('../assets/images/bg.mp4')}
                style={StyleSheet.absoluteFill}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                isMuted
            />
            <View style={styles.overlay}>
                <Text style={styles.welcome}>Welcome To Daintymeal!</Text>
                <TextInput
                    placeholder="Enter Username"
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    placeholder="Enter Email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Enter Password"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                    <Text style={styles.signUpButtonText}>SIGN UP</Text>
                </TouchableOpacity>
                <Text style={styles.orText}>OR</Text>
                <TouchableOpacity style={styles.continueButton}>
                    <FontAwesome name="envelope" size={20} color="black" />
                    <Text style={styles.continueButtonText}>Continue With Email</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueButton}>
                    <FontAwesome name="apple" size={20} color="black" />
                    <Text style={styles.continueButtonText}>Continue With Apple</Text>
                </TouchableOpacity>
                <View style={styles.socialContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <FontAwesome name="facebook" size={20} color="black" />
                        <Text style={styles.socialButtonText}>Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <FontAwesome name="google" size={20} color="black" />
                        <Text style={styles.socialButtonText}>Google</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={styles.signInText}>Already have an account? Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adding a semi-transparent overlay for better text visibility
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff', // Background color for inputs to make text readable
    },
    signUpButton: {
        width: '100%',
        padding: 15,
        backgroundColor: '#ff0066',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    welcome: {
        color: '#fff',
        fontWeight: 'bold',
    },
    signUpButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    orText: {
        marginVertical: 10,
        fontWeight: 'bold',
        color: '#fff', // Text color for better visibility
    },
    continueButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff', // Background color for buttons to make text readable
    },
    continueButtonText: {
        marginLeft: 10,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#fff', // Background color for buttons to make text readable
    },
    socialButtonText: {
        marginLeft: 10,
    },
    signInText: {
        marginTop: 20,
        color: '#fff',
        textDecorationLine: 'underline',
    },
});

export default Register;
