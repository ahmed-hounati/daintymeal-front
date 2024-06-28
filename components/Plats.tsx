import { useTheme } from '@/ThemeContext';
import Colors from '../constants/Colors';
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

interface Props {
    category: string;
}




const PlatCard: React.FC<{ item: Plat }> = ({ item }) => {
    const { darkMode } = useTheme();

    return (
        <View style={{
            backgroundColor: darkMode ? '#1c1c1c' : Colors.bg, // Apply dark mode background color
            borderRadius: 10,
            overflow: 'hidden',
            margin: 10,
            width: '90%',
            height: 350,
            alignSelf: 'center'
        }}>
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
            <View style={styles.details}>
                <Text style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: darkMode ? '#fff' : '#000'
                }}>{item.name}</Text>
                <View style={styles.info}>
                    <Text style={styles.time}>{item.time}</Text>
                    <Text style={styles.price}>{item.plat_price} {item.currency}</Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.rating}>
                        <Text style={{ color: 'white', fontSize: 16 }}><EvilIcons name="star" size={18} color="white" />{item.rating.toFixed(1)}</Text>
                    </View>
                    <Text style={styles.offer}>Special Offer</Text>
                </View>
            </View>
        </View>
    );
};

interface Props {
    category: string;
    searchQuery?: string;
}

const Plats: React.FC<Props> = ({ category, searchQuery }) => {
    const [data, setData] = useState<Plat[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchPlats();
    }, [category, searchQuery]);

    const fetchPlats = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://x2r9rfvwwi.execute-api.eu-north-1.amazonaws.com/dev/plats');
            const data = await response.json();
            const filteredPlats = data.filter((plat: Plat) =>
                (!category || plat.category.some(cat => cat.name === category)) &&
                (!searchQuery || plat.name.toLowerCase().includes(searchQuery.toLowerCase()))
            );
            setData(filteredPlats);
        } finally {
            setLoading(false);
        }
    };

    const renderItem: ListRenderItem<Plat> = ({ item }) => <PlatCard item={item} />;

    if (loading) {
        return <ActivityIndicator size="large" color={Colors.primary} />;
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
    image: {
        width: 370,
        height: 280,
        resizeMode: 'cover',
    },
    badgeText: {
        fontSize: 10,
        color: '#000',
    },
    details: {
        padding: 8,
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
