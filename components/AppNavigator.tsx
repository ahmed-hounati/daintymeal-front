import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantDetails from './RestaurantDetails';
import { Restaurant } from './Restos';

type RootStackParamList = {
    RestaurantDetails: { restaurant: Restaurant };
    // Define other screens here
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
            {/* Define other screens here */}
        </Stack.Navigator>
    );
};

export default AppNavigator;
