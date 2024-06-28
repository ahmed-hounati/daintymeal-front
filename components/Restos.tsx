import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, I18nManager } from 'react-native';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useTranslation } from 'react-i18next';
import i18n from '@/services/i18n';
import { useTheme } from '@/ThemeContext';

export type Restaurant = {
    name: any;
    _id: string;
    resto_code: string;
    ar: {
        name: string;
    };
    fr: {
        name: string;
    };
    en: {
        name: string;
    };
    address: any[];
    image: string[];
    workingTime: string;
    rating: number;
};

const RestaurantCard: React.FC<{ item: Restaurant; onPress: (restaurant: Restaurant) => void; selectedLanguage: 'ar' | 'fr' | 'en' }> = ({
    item,
    onPress,
    selectedLanguage
}) => {
    const { t } = useTranslation();

    const getRestaurantName = () => {
        switch (selectedLanguage) {
            case 'ar':
                return item.ar.name;
            case 'fr':
                return item.fr.name;
            default:
                return item.en.name;
        }
    };

    const getRestaurantAddress = () => {
        if (item.address.length > 0) {
            const address = item.address[0];
            const translations = address.translations;

            let addressString = '';

            switch (selectedLanguage) {
                case 'ar':
                    addressString = `${translations.ar.street}, ${translations.ar.city}, ${translations.ar.country}`;
                    break;
                case 'fr':
                    addressString = `${translations.fr.street}, ${translations.fr.city}, ${translations.fr.country}`;
                    break;
                default:
                    addressString = `${address.street}, ${address.city}, ${address.country}`;
                    break;
            }

            return addressString.trim();
        }
        return '';
    };

    const formatRating = () => {
        return item.rating ? item.rating.toFixed(1) : t('N/A');
    };

    const { darkMode } = useTheme();

    return (
        <TouchableOpacity onPress={() => onPress(item)}>
            <View style={{
                backgroundColor: darkMode ? '#1c1c1c' : Colors.bg,
                borderRadius: 10,
                overflow: 'hidden',
                height: 300,
                margin: 10,
                width: 200,
                flex: 1
            }}>
                <Image source={{ uri: item.image[0] }} style={styles.image} />
                <View style={styles.favoriteIconContainer}>
                    <MaterialIcons name="favorite-outline" size={24} color="black" style={styles.favoriteIcon} />
                </View>
                <View style={styles.details}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: darkMode ? '#fff' : '#000'
                    }}>{getRestaurantName()}</Text>
                    <Text style={styles.address}>{getRestaurantAddress()}</Text>
                    <View style={styles.info}>
                        <Text style={styles.time}>{item.workingTime}</Text>
                    </View>
                    <View style={styles.footer}>
                        <Text style={styles.offer}>{t('Special Offer')}</Text>
                        <View style={styles.rating}>
                            <Text style={{ color: '#fff', fontSize: 16 }}>
                                <EvilIcons name="star" size={18} color="white" />
                                {formatRating()}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

interface Props {
    onPress: (restaurant: Restaurant) => void;
    searchQuery?: string;
}

const Restos: React.FC<Props> = ({ onPress, searchQuery }) => {
    const [data, setData] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const selectedLanguage = i18n.language as 'ar' | 'fr' | 'en';
    const isRTL = I18nManager.isRTL;

    useEffect(() => {
        fetchRestaurants();
    }, [searchQuery]);

    const fetchRestaurants = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://x2r9rfvwwi.execute-api.eu-north-1.amazonaws.com/dev/restos');
            const data = await response.json();
            const filteredRestos = data.filter((resto: Restaurant) =>
                !searchQuery || resto.name.en.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setData(filteredRestos);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }: { item: Restaurant }) => (
        <RestaurantCard
            item={item}
            onPress={onPress}
            selectedLanguage={selectedLanguage}
        />
    );


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[
                    styles.flatListContentContainer,
                    isRTL && styles.flatListContentContainerRTL
                ]}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    favoriteIconContainer: {
        position: 'absolute',
        top: 3,
        right: 3,
    },
    favoriteIcon: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 5,
        borderRadius: 12,
    },
    address: {
        paddingVertical: 8,
        fontSize: 14,
        color: 'gray',
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1.5,
        resizeMode: 'cover',
    },
    details: {
        padding: 10,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
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
    flatListContentContainer: {
        paddingHorizontal: 10,
    },
    flatListContentContainerRTL: {
        paddingHorizontal: 10,
    },
});

export default Restos;
