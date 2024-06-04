import Colors from '@/constants/Colors';
import { EvilIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ListRenderItem, ActivityIndicator, SafeAreaView, FlatList } from 'react-native';

type Plat = {
    resto: any;
    currency: any;
    plat_price: number;
    category: any[];
    _id: string;
    image: string[];
    name: string;
    description: string;
    time: string;
    price: string;
    rating: number;
    offer: string;
    badge?: string;
};

const PlatCard: React.FC<{ item: Plat }> = ({ item }) => (
    <View style={styles.card}>
        <FlatList
            data={item.image}
            renderItem={({ item: img, index }) => (
                <Image key={index} source={{ uri: img }} style={styles.image} />
            )}
            keyExtractor={(img, index) => index.toString()}
            horizontal={true}
        />
        {item.category && item.category.length > 0 && (
            <View style={styles.categoryContainer}>
                <Text style={styles.categoryText}>{item.category[0].name}</Text>
            </View>
        )}
        {item.badge && (
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
        )}
        <View style={styles.details}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.info}>
                <Text style={styles.time}>{item.time}</Text>
                <Text style={styles.price}>{item.plat_price} {item.currency}</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.offer}>{item.resto[0].en.name}</Text>
                <View style={styles.rating}>
                    <Text style={{ color: 'white' }}><EvilIcons name="star" size={24} color="black" />{item.rating.toFixed(1)}</Text>
                </View>
            </View>
        </View>
    </View>
);


const Plats: React.FC = () => {
    const [data, setData] = useState<Plat[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPlats();
    }, []);

    const fetchPlats = async () => {
        try {
            const response = await fetch('https://x2r9rfvwwi.execute-api.eu-north-1.amazonaws.com/dev/plats');
            if (!response.ok) {
                throw new Error('Failed to fetch plats');
            }
            const data = await response.json();
            setData(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const renderItem: ListRenderItem<Plat> = ({ item }) => <PlatCard item={item} />;

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <SafeAreaView>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={{ paddingTop: 20 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        margin: 10,
        width: 370, // Adjusted to make it full width
        height: 350,
        flex: 1,
    },
    image: {
        width: 370, // Adjust width according to your preference
        height: 200, // Adjust height according to your preference
        resizeMode: 'cover',
    },
    badge: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'yellow',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
    },
    badgeText: {
        fontSize: 10,
        color: '#000',
    },
    details: {
        padding: 10,
    },
    title: {
        fontSize: 22,
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
        fontSize: 12,
        color: 'gray',
    },
    price: {
        fontSize: 16,
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
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
    },
    categoryContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    categoryText: {
        color: '#fff',
    },
});

export default Plats;
