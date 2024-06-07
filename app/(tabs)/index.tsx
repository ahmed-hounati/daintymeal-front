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

const Page: React.FC = () => {
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState('Fetching your location...');
  const [category, setCategory] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
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
  };

  const GetCurrentLocation = async () => {
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
        let address = `${response[0].name}, ${response[0].city}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  const handleRestaurantPress = (restaurant: Restaurant) => {
    router.push({
      pathname: '/restoDetails',
      params: {},
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.headerContainer}>
        <View style={styles.locationContainer}>
          <EvilIcons name="location" size={30} color={Colors.primary} />
          <Text>{displayCurrentAddress}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <AntDesign name="filter" size={26} color="black" />
          <Ionicons name="menu-outline" size={24} color="black" />
        </View>
      </View>
      <ExploreHeader onCategoryChanged={setCategory} />
      <ScrollView>
        <Restos onPress={handleRestaurantPress} />
        <Plats category={category} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  locationContainer: {
    flexDirection: 'row',
    padding: 6,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginRight: 6,
    marginTop: 4,
    gap: 4,
  }
});

export default Page;
