import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, ScrollView, I18nManager, TextInput } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { SvgUri } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import * as SplashScreen from 'expo-splash-screen';
import useAppRestart from '@/hooks/useAppRestart';
import { useTheme } from '@/ThemeContext';

interface Category {
    name: string;
    image: string;
    require: boolean;
    translation: {
        fr: {
            name: string;
        };
        ar: {
            name: string;
        };
    };
}

interface Props {
    onCategoryChanged: (category: string | null) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
    const { i18n, t } = useTranslation();
    const selectedLanguage = i18n.language as 'ar' | 'fr' | 'en';
    const [loaded, setLoaded] = useState(false);
    const [isRTL, setIsRTL] = useState(I18nManager.isRTL);
    const [searchQuery, setSearchQuery] = useState('');
    const { restartApp } = useAppRestart();
    const { darkMode, toggleDarkMode } = useTheme();

    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
        loadLanguage();
    }, []);

    const loadLanguage = async () => {
        try {
            const savedLanguage = await AsyncStorage.getItem('language');
            if (savedLanguage) {
                await i18n.changeLanguage(savedLanguage);
            }
            setLoaded(true);
            handleLanguageChange(savedLanguage || i18n.language);
        } catch (error) {
            console.error('Error loading language:', error);
            setLoaded(true);
        }
    };

    const handleLanguageChange = async (language: string) => {
        const isCurrentRTL = language === 'ar';
        if (isCurrentRTL !== I18nManager.isRTL) {
            I18nManager.forceRTL(isCurrentRTL);
        }
        setIsRTL(isCurrentRTL);
    };

    useEffect(() => {
        const saveLanguage = async () => {
            try {
                await AsyncStorage.setItem('language', i18n.language);
            } catch (error) {
                console.error('Error saving language:', error);
            }
        };
        if (loaded) {
            saveLanguage();
            handleLanguageChange(i18n.language);
        }
    }, [i18n.language, loaded]);

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
            const mappedCategories = data.map((category: Category) => ({
                ...category
            }));
            const allCategories = [{ name: 'All', style: { color: darkMode ? '#fff' : '#000' }, require: true, image: require('../assets/images/all.png') }, ...mappedCategories];
            setCategories(allCategories);
            setFilteredCategories(allCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const getCategoryName = (item: Category) => {
        switch (selectedLanguage) {
            case 'ar':
                return item.translation && item.translation.ar && item.translation.ar.name ? item.translation.ar.name : item.name;
            case 'fr':
                return item.translation && item.translation.fr && item.translation.fr.name ? item.translation.fr.name : item.name;
            default:
                return item.name;
        }
    };

    const selectCategory = (index: number) => {
        setActiveIndex(index);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onCategoryChanged(index === 0 ? null : filteredCategories[index].name);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query === '') {
            setFilteredCategories(categories);
        } else {
            const lowercasedQuery = query.toLowerCase();
            const filtered = categories.filter(category =>
                getCategoryName(category).toLowerCase().includes(lowercasedQuery)
            );
            setFilteredCategories(filtered);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: darkMode ? '#000' : '#fff', direction: isRTL ? 'rtl' : 'ltr' }}>
            <View style={{
                height: 130,
                backgroundColor: darkMode ? '#000' : '#fff'
            }}>
                <View style={styles.actionRow}>
                    <TextInput
                        style={{
                            flex: 1,
                            color: darkMode ? '#fff' : '#000',
                            backgroundColor: darkMode ? '#000' : '#fff',
                            padding: 14,
                            borderRadius: 15,
                            elevation: darkMode ? 2 : 0,  // Apply elevation only in dark mode
                            shadowColor: darkMode ? '#000' : 'transparent',  // Apply shadow color only in dark mode
                            shadowOpacity: 0.12,
                            shadowRadius: 2,
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            borderWidth: darkMode ? 1 : 0,  // Apply border only in dark mode
                            borderColor: darkMode ? '#555' : 'transparent',  // Border color in dark mode
                            marginRight: 10,
                        }}
                        placeholder={t('Search for restaurants or dishes')}
                        placeholderTextColor={darkMode ? Colors.grey : '#c2c2c2'}
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />



                    <Ionicons name="search" size={24} color={Colors.primary} style={styles.searchIcon} />
                </View>
                <ScrollView
                    horizontal={true}
                    style={{ flex: 1 }}
                    contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}
                    showsHorizontalScrollIndicator={false}
                >
                    {filteredCategories.map((item, index) => (
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
                            <Text style={activeIndex === index ? {
                                fontSize: 14,
                                fontFamily: 'mon-sb',
                                color: darkMode ? '#fff' : Colors.grey
                            } : {
                                fontSize: 12,
                                fontFamily: 'mon-sb',
                                color: darkMode ? '#fff' : Colors.grey,
                                marginHorizontal: 10,
                            }}>
                                {getCategoryName(item)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    searchIcon: {
        position: 'absolute',
        top: 15,
        right: 40
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#A2A0A2',
        borderRadius: 24,
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
