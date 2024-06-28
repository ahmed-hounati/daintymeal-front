import { useTheme } from '@/ThemeContext';
import { EvilIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import Colors from '@/constants/Colors';

const FeaturedItems = () => {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const { t, i18n } = useTranslation();
    const { darkMode } = useTheme();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Add state for error handling

    const fetchPlats = async () => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const response = await fetch('https://x2r9rfvwwi.execute-api.eu-north-1.amazonaws.com/dev/plats');
            if (!response.ok) {
                throw new Error('Failed to fetch plats');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlats();
    }, [params.lang]);

    if (loading) {
        return <ActivityIndicator size="large" style={{ position: 'absolute', top: '50%', right: '50%' }} color={Colors.primary} />;
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity>
            <View style={[
                styles.card,
                { backgroundColor: darkMode ? '#1c1c1c' : '#fff' }
            ]}>
                <Image source={{ uri: item.image[0] }} style={styles.cardImage} />
                <View style={styles.favoriteIconContainer}>
                    <Ionicons name="add-outline" size={24} color="white" />
                </View>
                <View style={styles.favIconContainer}>
                    <MaterialIcons name="favorite-outline" size={24} color="black" style={styles.favoriteIcon} />
                </View>
                <View style={styles.cardDetails}>
                    <Text style={[
                        styles.cardTitle,
                        { color: darkMode ? '#fff' : '#000' }
                    ]}>{item.name}</Text>
                    <View style={styles.info}>
                        <Text style={styles.time}>{item.category[0].name}</Text>
                        <Text style={styles.time}>{item.plat_price}{item.currency}</Text>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.offer}>{t('Special Offer')}</Text>
                        <View style={styles.rating}>
                            <Text style={styles.ratingText}>
                                <EvilIcons name="star" size={18} color="white" />
                                {item.rating.toFixed(1)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[
            styles.container,
            { backgroundColor: darkMode ? '#000' : '#f5f5f5' }
        ]}>
            <Text style={[
                styles.header,
                { color: darkMode ? '#fff' : '#333333' }
            ]}>{t('FEATURED ITEMS')}</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 12,
        marginHorizontal: 24,
    },
    list: {
        paddingHorizontal: 8,
    },
    row: {
        justifyContent: 'space-evenly',
        marginBottom: 4, // Reduced space between rows
    },
    card: {
        borderRadius: 10,
        overflow: 'hidden',
        width: '100%', // Adjusted for 2 columns
        marginBottom: 8, // Reduced space between columns
        marginHorizontal: 4, // Reduced horizontal space
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    cardImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
    },
    favoriteIconContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.primary,
        borderRadius: 6,
    },
    favIconContainer: {
        position: 'absolute',
        top: 8,
        left: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
    },
    favoriteIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 5,
        borderRadius: 12,
    },
    cardDetails: {
        padding: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    time: {
        fontSize: 14,
        color: 'gray',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    offer: {
        backgroundColor: 'green',
        color: '#fff',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        fontSize: 12,
    },
    rating: {
        backgroundColor: Colors.primary,
        color: '#fff',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    ratingText: {
        color: '#fff',
        fontSize: 12,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});

export default FeaturedItems;
