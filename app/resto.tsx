import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/ThemeContext';

export default function Resto() {
    const navigation = useNavigation();
    const params = useLocalSearchParams();
    const { t, i18n } = useTranslation();
    const { darkMode } = useTheme();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [restoName, setRestoName] = useState('');
    const [restoAddress, setRestoAddress] = useState('');
    const [restoImage, setRestoImage] = useState('');
    const [avatarImage, setAvatarImage] = useState('');

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
            fetchRestaurantDetails(resto_code);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRestaurantDetails = async (resto_code: string | string[]) => {
        try {
            const response = await fetch(`https://x2r9rfvwwi.execute-api.eu-north-1.amazonaws.com/dev/restos/${resto_code}`);
            if (!response.ok) {
                throw new Error('Failed to fetch restaurant details');
            }
            const responseData = await response.json();
            console.log(responseData);

            const translatedName = responseData[i18n.language]?.name || responseData.name;
            const translatedAddress = responseData.address.find((addr: { translations: { [x: string]: any; }; }) => addr.translations[i18n.language])?.translations[i18n.language] || responseData.address[0];
            const restoImage = responseData.image[0];
            const avatarImage = responseData.avatar || responseData.image[0]; // Assuming avatar image URL is provided
            setRestoName(translatedName);
            setRestoAddress(`${translatedAddress.street}, ${translatedAddress.city}, ${translatedAddress.state}, ${translatedAddress.country}`);
            setRestoImage(restoImage);
            setAvatarImage(avatarImage);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPlats();
    }, [params.lang]);

    if (loading) {
        return <ActivityIndicator style={{ marginTop: 100 }} size="large" color={Colors.primary} />;
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: darkMode ? '#000' : '#fff',
        }}>
            <ScrollView>
                {restoImage ? (
                    <Image source={{ uri: restoImage }} style={styles.headerImage} />
                ) : null}
                <View style={{
                    flexDirection: 'row',
                    padding: 16,
                    backgroundColor: darkMode ? '#1c1c1c' : '#fff',
                    alignItems: 'center',
                }}>
                    {avatarImage ? (
                        <Image source={{ uri: avatarImage }} style={styles.avatarImage} />
                    ) : null}
                    <View style={styles.headerTextContainer}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: darkMode ? '#fff' : '#000',
                        }}>{restoName}</Text>
                        <Text style={styles.address}>{restoAddress}</Text>
                        <View style={styles.ratingContainer}>
                            <Entypo name="star" size={24} color="gold" />
                            <Text style={{
                                fontSize: 16,
                                marginLeft: 4,
                                color: darkMode ? '#fff' : '#000',
                            }}>4.37</Text>
                        </View>
                        <View style={styles.deliveryInfo}>
                            <Text style={styles.deliveryText}>{t('Delivery')}</Text>
                            <Text style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: darkMode ? '#fff' : '#000',
                            }}>25 min</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    padding: 16,
                    backgroundColor: darkMode ? '#000' : '#f8f8f8',
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginVertical: 8,
                        color: darkMode ? '#fff' : '#000',
                    }}>{t('Deals & savings')}</Text>
                    <View style={{
                        backgroundColor: darkMode ? '#1c1c1c' : '#fff',
                        padding: 16,
                        borderRadius: 8,
                        marginVertical: 8,
                        elevation: 2,
                    }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 'bold',
                            color: darkMode ? '#fff' : '#000',
                        }}>{t('Buy 1, get 1 free')}</Text>
                        <Text style={styles.dealDescription}>{t('Select CROISSAN\'WICH®')}</Text>
                    </View>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginVertical: 8,
                        color: darkMode ? '#fff' : '#000',
                    }}>{t('Featured Items')}</Text>
                    <View style={styles.itemsContainer}>
                        {data.map((item, index) => (
                            <TouchableOpacity key={index} style={{
                                width: '48%',
                                backgroundColor: darkMode ? '#1c1c1c' : '#fff',
                                borderRadius: 8,
                                marginBottom: 16,
                                elevation: 2,
                            }}>
                                <Image source={{ uri: item.image[0] }} style={styles.itemImage} />
                                <View style={styles.itemDetails}>
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: darkMode ? '#fff' : '#000',
                                    }}>{item.name}</Text>
                                    <Text style={styles.itemPrice}>{item.plat_price}{item.currency}</Text>
                                    <View style={styles.itemFooter}>
                                        <Text style={styles.specialOffer}>{t('Special Offer')}</Text>
                                        <View style={styles.itemRating}>
                                            <Entypo name="star" size={18} color="gold" />
                                            <Text style={styles.itemRatingText}>{item.rating.toFixed(1)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        width: '100%',
        height: 200,
    },
    avatarImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    headerTextContainer: {
        flex: 1,
    },
    address: {
        fontSize: 14,
        color: '#888',
        marginVertical: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    deliveryInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    deliveryText: {
        fontSize: 14,
        color: '#888',
    },
    dealDescription: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    itemsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    itemImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    itemDetails: {
        padding: 8,
    },
    itemPrice: {
        fontSize: 14,
        color: '#888',
        marginVertical: 4,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    specialOffer: {
        backgroundColor: 'green',
        color: '#fff',
        padding: 4,
        borderRadius: 4,
        fontSize: 12,
    },
    itemRating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 4,
        margin: 4,
        padding: 3
    },
    itemRatingText: {
        fontSize: 14,
        color: '#fff',
        backgroundColor: Colors.primary,
        borderRadius: 3
    },
    headerButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    rightHeaderButtons: {
        flexDirection: 'row',
    },
    headerButton: {
        marginHorizontal: 8,
    },
});
