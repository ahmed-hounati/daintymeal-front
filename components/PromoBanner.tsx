import React from 'react';
import { ScrollView, Image, StyleSheet, View } from 'react-native';

const PromoBanner: React.FC = () => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                contentContainerStyle={styles.scrollViewContainer}
            >
                <Image source={require('../assets/images/banner.png')} style={styles.image} />
                <Image source={require('../assets/images/banner1.png')} style={styles.image} />
                <Image source={require('../assets/images/banner2.png')} style={styles.image} />
                {/* <Image source={require('../assets/images/sbanner1.png')} style={styles.image} />
                <Image source={require('../assets/images/sbanner2.png')} style={styles.image} />
                <Image source={require('../assets/images/sbanner3.png')} style={styles.image} />
                <Image source={require('../assets/images/sbanner4.png')} style={styles.image} /> */}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        backgroundColor: 'white',
        shadowColor: 'white',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        borderBlockColor: 'white',
    },
    scrollViewContainer: {
        alignItems: 'center',
    },
    image: {
        width: 350, 
        height: 200,
        margin: 10,
        resizeMode: 'cover',
        marginHorizontal: 5, 
        borderRadius: 10
    },
});

export default PromoBanner;
