import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.profileHeader}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                <Text style={styles.profileName}>Nellie H. Riggs</Text>
                <Text style={styles.profileEmail}>youremail@gmail.com</Text>
            </View>
            <View style={styles.profileOptions}>
                <TouchableOpacity style={styles.optionItem}>
                    <Text style={styles.optionText}>Accounts Credits</Text>
                    <Text style={styles.optionValue}>$52.25</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem}>
                    <Text style={styles.optionText}>Payment Cards</Text>
                    <Text style={styles.optionValue}>&gt;</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem}>
                    <Text style={styles.optionText}>Address</Text>
                    <Text style={styles.optionValue}>&gt;</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem}>
                    <Text style={styles.optionText}>Refer Friends</Text>
                    <Text style={styles.optionValue}>Get $10.00 FREE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem}>
                    <Text style={styles.optionText}>Delivery Support</Text>
                    <Text style={styles.optionValue}>&gt;</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem}>
                    <Text style={styles.optionText}>Contact</Text>
                    <Text style={styles.optionValue}>&gt;</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem}>
                    <Text style={styles.optionText}>Term of use</Text>
                    <Text style={styles.optionValue}>&gt;</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 12,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    profileEmail: {
        fontSize: 14,
        color: '#666',
    },
    profileOptions: {
        paddingVertical: 16,
    },
    optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    optionValue: {
        fontSize: 16,
        color: '#666',
    },
});

export default ProfileScreen;
