import React, { useState, useEffect } from 'react';
import { View, Alert, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExploreHeader from '@/components/ExploreHeader';
import Plats from '@/components/Plats';
import Restos, { Restaurant } from '@/components/Restos';
import * as Location from 'expo-location';
import { EvilIcons, Ionicons, AntDesign } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import PromoBanner from '@/components/PromoBanner';
import { useTheme } from '@/ThemeContext';

const Page: React.FC = () => {
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Fetching your location...');
  const [category, setCategory] = useState<string>('');
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { darkMode } = useTheme();

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        await checkIfLocationEnabled();
        await getCurrentLocation();
      } catch (error) {
        console.error('Error initializing location:', error);
      }
    };
    initializeLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    try {
      let enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        Alert.alert(
          'Location Services not enabled',
          'Please enable your location services to continue',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      } else {
        setLocationServicesEnabled(true);
      }
    } catch (error) {
      console.error('Error checking if location is enabled:', error);
      throw error;
    }
  };

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission not granted',
          'Allow the app to use the location service',
          [{ text: 'OK' }],
          { cancelable: false }
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      let { coords } = location;
      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (response.length > 0) {
          let address = `${response[0].city}`;
          setDisplayCurrentAddress(address);
        }
      }
    } catch (error) {
      console.error('Error getting current location:', error);
      Alert.alert('Error', 'Failed to fetch the current location. Please try again.');
      throw error;
    }
  };

  const handleRestaurantPress = (restaurant: Restaurant) => {
    router.push({
      pathname: 'resto',
      params: {
        name: restaurant.en.name,
        address: restaurant.address[0].city,
        _id: restaurant._id,
        image: restaurant.image[0],
        workingTime: restaurant.workingTime,
        rating: restaurant.rating,
        street: restaurant.address[0].street,
        resto_code: restaurant.resto_code
      },
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement your search logic here
    // For example, filter data based on the search query
    // You might want to trigger fetching new data based on the query
    // Example: fetch new data from API based on searchQuery
    // Here you can define how to handle search results or filtering
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: darkMode ? '#000' : '#fff' }}>
      <View style={[styles.headerContainer, darkMode && styles.darkHeaderContainer]}>
        <View style={styles.locationContainer}>
          <EvilIcons name="location" size={30} color={Colors.primary} />
          <Text style={[styles.addressText, darkMode && styles.darkText]}>{displayCurrentAddress}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <AntDesign name="filter" size={26} color={darkMode ? '#fff' : 'black'} />
          <Ionicons name="menu-outline" size={24} color={darkMode ? '#fff' : 'black'} />
        </View>
      </View>
      <ExploreHeader onCategoryChanged={setCategory} onSearch={handleSearch} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <PromoBanner />
        <Restos onPress={handleRestaurantPress} searchQuery={searchQuery} />
        <Plats category={category} searchQuery={searchQuery} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  darkHeaderContainer: {
    backgroundColor: '#000',
  },
  locationContainer: {
    flexDirection: 'row',
    padding: 6,
  },
  addressText: {
    color: '#000',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginRight: 6,
    marginTop: 4,
    gap: 4,
  },
  scrollViewContainer: {
    paddingBottom: 20,
  },
  darkText: {
    color: '#fff',
  },
});

export default Page;
