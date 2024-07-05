import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Switch,
    Image,
    Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../authService';
import { useAuth } from '../AuthContext';

export default function ProfileScreen() {
    const { darkMode, toggleDarkMode } = useTheme();
    const { isAuthenticated, userInfo, checkAuthStatus } = useAuth();
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await logout();
            await AsyncStorage.removeItem('access_token');
            await AsyncStorage.removeItem('user_code');
            Alert.alert('Logged Out', 'You have been logged out.');
            checkAuthStatus();
            navigation.navigate('login');
        } catch (error) {
            Alert.alert('Logout Failed', 'Please try again.');
        }
    };


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: darkMode ? '#000' : '#fff',
            paddingTop: 35
        }}>
            <View style={styles.container}>
                {isAuthenticated ? (
                    <>
                        <View style={[styles.profile, darkMode && styles.darkProfile]}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}>
                                <View style={styles.profileAvatarWrapper}>
                                    <Image
                                        alt=""
                                        source={{
                                            uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                                        }}
                                        style={styles.profileAvatar} />

                                    <TouchableOpacity
                                        onPress={() => {
                                            // handle onPress
                                        }}>
                                        <View style={styles.profileAction}>
                                            <FeatherIcon
                                                color="#fff"
                                                name="edit-3"
                                                size={15} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>

                            <View>
                                <Text style={[styles.profileName, darkMode && styles.darkText]}>
                                    {userInfo ? userInfo.username : 'Loading...'}
                                </Text>

                                <Text style={[styles.profileAddress, darkMode && styles.darkText]}>
                                    123 Maple Street. Anytown, PA 17101
                                </Text>
                            </View>
                        </View>

                        <ScrollView>
                            <View style={styles.section}>
                                <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Preferences</Text>

                                <TouchableOpacity
                                    onPress={() => {
                                        // handle onPress
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 16,
                                        backgroundColor: darkMode ? '#000' : '#fff'
                                    }}>
                                    <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
                                        <FeatherIcon color="#fff" name="globe" size={20} />
                                    </View>

                                    <Text style={[styles.rowLabel, darkMode && styles.darkText]}>Language</Text>

                                    <View style={styles.rowSpacer} />

                                    <FeatherIcon
                                        color="#C6C6C6"
                                        name="chevron-right"
                                        size={20} />
                                </TouchableOpacity>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 16,
                                    backgroundColor: darkMode ? '#000' : '#fff'
                                }}>
                                    <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                                        <FeatherIcon color="#fff" name="moon" size={20} />
                                    </View>

                                    <Text style={[styles.rowLabel, darkMode && styles.darkText]}>Dark Mode</Text>

                                    <View style={styles.rowSpacer} />

                                    <Switch
                                        onValueChange={toggleDarkMode}
                                        value={darkMode} />
                                </View>

                                <TouchableOpacity
                                    onPress={() => {
                                        // handle onPress
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 16,
                                        backgroundColor: darkMode ? '#000' : '#fff'
                                    }}>
                                    <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
                                        <FeatherIcon
                                            color="#fff"
                                            name="navigation"
                                            size={20} />
                                    </View>

                                    <Text style={[styles.rowLabel, darkMode && styles.darkText]}>Notifications</Text>

                                    <View style={styles.rowSpacer} />

                                    <FeatherIcon
                                        color="#C6C6C6"
                                        name="chevron-right"
                                        size={20} />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleLogout}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 16,
                                        backgroundColor: darkMode ? '#000' : '#fff',
                                        marginTop: 16,
                                    }}>
                                    <View style={[styles.rowIcon, { backgroundColor: '#ff0066' }]}>
                                        <FeatherIcon
                                            color="#fff"
                                            name="log-out"
                                            size={20} />
                                    </View>

                                    <Text style={[styles.rowLabel, darkMode && styles.darkText]}>Logout</Text>

                                    <View style={styles.rowSpacer} />

                                    <FeatherIcon
                                        color="#C6C6C6"
                                        name="chevron-right"
                                        size={20} />
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </>
                ) : (
                    <View style={styles.section}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 16,
                            backgroundColor: darkMode ? '#000' : '#fff'
                        }}>
                            <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
                                <FeatherIcon color="#fff" name="moon" size={20} />
                            </View>

                            <Text style={[styles.rowLabel, darkMode && styles.darkText]}>Dark Mode</Text>

                            <View style={styles.rowSpacer} />

                            <Switch
                                onValueChange={toggleDarkMode}
                                value={darkMode} />
                        </View>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('register')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 16,
                                backgroundColor: darkMode ? '#000' : '#fff',
                                marginTop: 16,
                            }}>
                            <View style={[styles.rowIcon, { backgroundColor: '#ff0066' }]}>
                                <FeatherIcon
                                    color="#fff"
                                    name="user-plus"
                                    size={20} />
                            </View>

                            <Text style={[styles.rowLabel, darkMode && styles.darkText]}>Register</Text>

                            <View style={styles.rowSpacer} />

                            <FeatherIcon
                                color="#C6C6C6"
                                name="chevron-right"
                                size={20} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('login')}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                padding: 16,
                                backgroundColor: darkMode ? '#000' : '#fff',
                                marginTop: 16,
                            }}>
                            <View style={[styles.rowIcon, { backgroundColor: '#ff0066' }]}>
                                <FeatherIcon
                                    color="#fff"
                                    name="user-plus"
                                    size={20} />
                            </View>

                            <Text style={[styles.rowLabel, darkMode && styles.darkText]}>Login</Text>

                            <View style={styles.rowSpacer} />

                            <FeatherIcon
                                color="#C6C6C6"
                                name="chevron-right"
                                size={20} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    profile: {
        padding: 24,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    darkProfile: {
        backgroundColor: '#000',
    },
    profileAvatarWrapper: {
        marginRight: 16,
        position: 'relative',
    },
    profileAvatar: {
        width: 72,
        height: 72,
        borderRadius: 50,
    },
    profileAction: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffd700',
    },
    profileName: {
        fontSize: 16,
        fontWeight: '600',
    },
    profileAddress: {
        color: '#888',
        marginTop: 4,
        fontSize: 12,
    },
    section: {
        marginTop: 32,
    },
    sectionTitle: {
        fontWeight: '600',
        fontSize: 13,
        color: '#666',
        paddingHorizontal: 8,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    rowIcon: {
        width: 32,
        height: 32,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    rowLabel: {
        fontSize: 17,
        fontWeight: '500',
    },
    rowSpacer: {
        flex: 1,
    },
    darkText: {
        color: '#fff',
    },
});
