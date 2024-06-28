import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import Colors from '@/constants/Colors';
import { useTranslation } from 'react-i18next';
import Plats from '@/components/Plats';
import Restos from '@/components/Restos';

const SearchScreen: React.FC = () => {
    const { t } = useTranslation();
    const [query, setQuery] = useState<string>('');
    const [category, setCategory] = useState<string>('');

    const handleSearch = (text: string) => {
        setQuery(text);
        setCategory(text);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={t('Search for restaurants, dishes, or categories')}
                    value={query}
                    onChangeText={handleSearch}
                />
            </View>
            <FlatList
                data={[]}
                ListHeaderComponent={
                    <>
                        <Text style={styles.sectionTitle}>{t('Restaurants')}</Text>
                        <Restos onPress={() => { }} searchQuery={query} />
                        <Text style={styles.sectionTitle}>{t('Dishes')}</Text>
                        <Plats category={category} />
                    </>
                }
                renderItem={null}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bg,
    },
    searchContainer: {
        padding: 10,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: Colors.grey,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
    },
});

export default SearchScreen;
