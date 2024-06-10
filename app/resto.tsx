import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EvilIcons, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

export default function Resto() {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const [data, setData] = useState<Array<{
        currency: any;
        plat_price: any;
        category: any; image: string[]; name: string; created_at: string; rating: number
    }>>([]);

    const [loading, setLoading] = useState(true);

    const fetchPlats = async () => {
        const resto_code = params.resto_code;
        if (!resto_code) {
            console.error('resto_code parameter is missing');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`https://x2r9rfvwwi.execute-api.eu-north-1.amazonaws.com/dev/restos/${resto_code}/plats`);
            if (!response.ok) {
                throw new Error('Failed to fetch restaurants');
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
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="chevron-left" size={18} color="#ffffff" />
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <View style={styles.headerFontAwesome5s}>
                    <TouchableOpacity style={styles.headerFontAwesome5}>
                        <FontAwesome5 name="star" size={18} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerFontAwesome5}>
                        <FontAwesome5 name="map-pin" size={18} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerFontAwesome5}>
                        <FontAwesome5 name="phone" size={18} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleButton}>
                        <FontAwesome5 name="list" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.restaurantName}>{params.name}</Text>
                <Text style={styles.address}>{params.street}, {params.address}</Text>
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingStars}>
                        <FontAwesome5 name="star" size={16} color="#ffc107" />
                        <FontAwesome5 name="star" size={16} color="#ffc107" />
                        <FontAwesome5 name="star" size={16} color="#ffc107" />
                        <FontAwesome5 name="star" size={16} color="#ffc107" />
                        <FontAwesome5 name="star" size={16} color="#c4c4c4" />
                    </View>
                </View>
                <View style={styles.detailsRow}>
                    <View style={styles.detailsCol}>
                        <Text style={styles.detailsText}>Open time <Text style={styles.badge}>{params.workingTime}</Text></Text>
                    </View>
                </View>
            </View>
            <Text style={styles.sectionTitle}>FEATURED ITEMS</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.slider}>
                {data && data.map((item, index) => (
                    <TouchableOpacity key={index}>
                        <View style={styles.card}>
                            <Image source={{ uri: item.image[0] }} style={styles.cardImage} />
                            <View style={styles.favoriteIconContainer}>
                                <Ionicons name="add-outline" size={24} color="white" />
                            </View>
                            <View style={styles.favIconContainer}>
                                <MaterialIcons name="favorite-outline" size={24} color="black" style={styles.favoriteIcon} />
                            </View>
                            <View style={styles.cardDetails}>
                                <Text style={styles.cardTitle}>{item.name}</Text>
                                <View style={styles.info}>
                                    <Text style={styles.time}>{item.category[0].name}</Text>
                                    <Text style={styles.time}>{item.plat_price}{item.currency}</Text>
                                </View>
                                <View style={styles.footer}>
                                    <Text style={styles.offer}>Special Offer</Text>
                                    <View style={styles.rating}>
                                        <Text style={{ color: '#fff', fontSize: 16 }}>
                                            <EvilIcons name="star" size={18} color="white" />
                                            {item.rating.toFixed(1)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginTop: 50,
    },
    header: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        color: '#ffffff',
        fontSize: 16,
        marginLeft: 8,
    },
    headerFontAwesome5s: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerFontAwesome5: {
        marginLeft: 16,
        position: 'relative',
    },
    toggleButton: {
        marginLeft: 16,
    },
    detailsContainer: {
        color: 'white',
        paddingVertical: 24,
        paddingHorizontal: 24,
        backgroundColor: Colors.primary,
    },
    restaurantName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    address: {
        fontSize: 14,
        color: 'white',
        marginTop: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    ratingStars: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    detailsCol: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsText: {
        fontSize: 14,
        color: 'white',
    },
    badge: {
        backgroundColor: '#F29E02',
        borderRadius: 18,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginTop: 16,
        marginBottom: 12,
        marginHorizontal: 24,
    },
    slider: {
        paddingHorizontal: 24,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        width: 200,
        marginRight: 16,
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
        borderRadius: 6
    },
    favIconContainer: {
        position: 'absolute',
        top: 8,
        left: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6
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
});
