import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

const Register = () => {
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
                <Text style={styles.welcome}>Enter your info</Text>
                <TextInput placeholder="Enter Mobile" style={styles.input} />
                <TextInput placeholder="Enter Password" style={styles.input} secureTextEntry />
                <TouchableOpacity style={styles.signUpButton}>
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
                <TouchableOpacity>
                    <Text style={styles.signInText}>Already an account? Sign in</Text>
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
        padding: 20
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
