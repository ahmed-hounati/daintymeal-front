import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { SvgUri } from 'react-native-svg';

interface Category {
    name: string;
    image: string;
    require: boolean;
}

interface Props {
    onCategoryChanged: (category: string | null) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://x2r9rfvwwi.execute-api.eu-north-1.amazonaws.com/dev/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories([{ name: 'All', require: true, image: require('../assets/images/all.png') }, ...data]);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const selectCategory = (index: number) => {
        setActiveIndex(index);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onCategoryChanged(index === 0 ? null : categories[index].name);
    };

    return (
        <SafeAreaView style={{ backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <View style={styles.actionRow}>
                    <TouchableOpacity>
                        <View style={styles.searchBtn}>
                            <Ionicons name="search" size={24} color={Colors.primary} />
                            <View>
                                <Text style={{ color: Colors.grey, fontFamily: 'mon' }}>
                                    Search for restaurants or dishes
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal={true}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}
                    showsHorizontalScrollIndicator={false}
                >
                    {categories.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                            onPress={() => selectCategory(index)}
                        >
                            {item.require ? (
                                <Image
                                    source={require('../assets/images/all.png')}
                                    style={{ width: 24, height: 24 }}
                                />
                            ) : (
                                <SvgUri
                                    uri={item.image}
                                    width={24}
                                    height={24}
                                />
                            )}
                            <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 130,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    searchBtn: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 10,
        padding: 14,
        alignItems: 'center',
        width: '100%',
        borderColor: '#c2c2c2',
        borderRadius: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.12,
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#A2A0A2',
        borderRadius: 24,
    },
    categoryText: {
        fontSize: 12,
        fontFamily: 'mon-sb',
        color: Colors.grey,
        marginHorizontal: 10,
    },
    categoryTextActive: {
        fontSize: 14,
        fontFamily: 'mon-sb',
        color: '#000',
    },
    categoriesBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 8,
    },
    categoriesBtnActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: 8,
    },
});

export default ExploreHeader;
