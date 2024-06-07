import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface PromoBannerProps {
    backgroundColor: string;
    imageSource: string;
    title: string;
    subtitle: string;
    buttonText: string;
    onPress: () => void;
}

const PromoBanner: React.FC<PromoBannerProps> = ({ backgroundColor, imageSource, title, subtitle, buttonText, onPress }) => {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Image source={{ uri: imageSource }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <TouchableOpacity onPress={onPress} style={styles.button}>
                    <Text style={styles.buttonText}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 10,
        padding: 15,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    textContainer: {
        flex: 1,
        marginLeft: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 14,
        color: '#fff',
        marginVertical: 5,
    },
    button: {
        backgroundColor: '#ffcc00',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 5,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default PromoBanner;
