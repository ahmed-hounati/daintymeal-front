import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Restaurant } from './Restos';

type RootStackParamList = {
    RestaurantDetails: { restaurant: Restaurant };
};

type RestaurantDetailsScreenRouteProp = RouteProp<RootStackParamList, 'RestaurantDetails'>;

type Props = {
    route: RestaurantDetailsScreenRouteProp;
};

const RestaurantDetails: React.FC<Props> = ({ route }) => {
    const { restaurant } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: restaurant.image[0] }} style={styles.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{restaurant.name}</Text>
                <Text style={styles.address}>{restaurant.address[0].street}, {restaurant.address[0].city}</Text>
                <Text style={styles.workingTime}>Working Time: {restaurant.workingTime}</Text>
                <Text style={styles.rating}>Rating: {restaurant.rating.toFixed(1)}</Text>
                {/* Add more details as needed */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    address: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 10,
    },
    workingTime: {
        fontSize: 16,
        marginBottom: 10,
    },
    rating: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default RestaurantDetails;
