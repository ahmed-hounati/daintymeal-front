import Colors from '@/constants/Colors';
import { EvilIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ListRenderItem, ActivityIndicator, SafeAreaView } from 'react-native';

type Restaurant = {
    address: any[];
    _id: string;
    image: string[];
    name: string;
    en: {
        name: string;
    };
    workingTime: string;
    rating: number;
};

const RestaurantCard: React.FC<{ item: Restaurant }> = ({ item }) => (
    <View style={styles.card}>
        <Image source={{ uri: item.image[0] }} style={styles.image} />
        <View style={styles.details}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.address}>{item.address[0].street}, {item.address[0].city}</Text>

            <View style={styles.info}>
                <Text style={styles.time}>{item.workingTime}</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.offer}>Special Offer</Text>
                <View style={styles.rating}><Text style={{ color: '#fff', fontSize: 16 }}><EvilIcons name="star" size={18} color="white" />{item.rating.toFixed(1)}</Text></View>
            </View>
        </View>
    </View>
);

const Restos: React.FC = () => {
    const [data, setData] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await fetch('https://x2r9rfvwwi.execute-api.eu-north-1.amazonaws.com/dev/restos');
            if (!response.ok) {
                throw new Error('Failed to fetch restaurants');
            }
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const renderItem: ListRenderItem<Restaurant> = ({ item }) => <RestaurantCard item={item} />;

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: 45 }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    horizontal
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        height: 330,
        margin: 10,
        width: 200,
        flex: 1,
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
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 12,
        color: 'gray',
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
    price: {
        fontSize: 12,
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

export default Restos;