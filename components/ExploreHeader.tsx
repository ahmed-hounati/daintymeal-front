import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRef, useState, useEffect } from 'react'; // Added useEffect
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';

interface Category {
    name: string;
    image: string;
}

interface Props {
    onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]); // State to hold categories

    useEffect(() => {
        // Fetch categories from Lambda function
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://x2r9rfvwwi.execute-api.eu-north-1.amazonaws.com/dev/categories');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();

            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const selectCategory = (index: number) => {
        const selected = itemsRef.current[index];
        setActiveIndex(index);
        selected?.measure((x) => {
            scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onCategoryChanged(categories[index].name);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: 36 }}>
            <View style={styles.container}>
                <SafeAreaView>
                    <View style={styles.actionRow}>
                        <Link href={'/(modals)/booking'} asChild>
                            <TouchableOpacity>
                                <View style={styles.searchBtn}>
                                    <Ionicons name="search" size={24} />
                                    <View>
                                        <Text style={{ fontFamily: 'mon-sb' }}>Where to?</Text>
                                        <Text style={{ color: Colors.grey, fontFamily: 'mon' }}>Anywhere Â· Any week</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Link>
                        <TouchableOpacity style={styles.filterBtn}>
                            <Ionicons name="options-outline" size={24} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
                <ScrollView
                    horizontal
                    ref={scrollRef}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: 'center',
                        gap: 20,
                        paddingHorizontal: 16,
                    }}>
                    {categories ? (
                        categories.map((item, index) => (
                            <TouchableOpacity
                                ref={(el) => (itemsRef.current[index] = el)}
                                key={index}
                                style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                                onPress={() => selectCategory(index)}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{
                                        width: 24,
                                        height: 24,
                                    }}
                                />
                                <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text>Loading categories...</Text>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: 130,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
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
        width: 280,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#c2c2c2',
        borderRadius: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#A2A0A2',
        borderRadius: 24,
    },
    categoryText: {
        fontSize: 16,
        fontFamily: 'mon-sb',
        color: Colors.grey,
    },
    categoryTextActive: {
        fontSize: 18,
        fontFamily: 'mon-sb',
        color: '#000',
    },
    categoriesBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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




















// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import React from 'react';
// import { SafeAreaView, Text } from 'react-native';
// import Header from '../../../layout/Header';
// import CustomNavigation from './CustomNavigation';
// import { useTheme } from '@react-navigation/native';


// const Home = () => {
//     return (
//         <>
//         </>
//     )
// }
// const Market = () => {
//     return (
//         <>
//         </>
//     )
// }
// const Change = () => {
//     return (
//         <>
//         </>
//     )
// }
// const Wallet = () => {
//     return (
//         <>
//         </>
//     )
// }
// const Profile = () => {
//     return (
//         <>
//         </>
//     )
// }

// const Tab = createBottomTabNavigator();

// const TabStyle3 = (props) => {

//     const { colors } = useTheme();

//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
//             <Header title={'Footer Style 3'} bgWhite leftIcon={'back'} />
//             <Tab.Navigator
//                 tabBar={props => <CustomNavigation {...props} />}
//                 screenOptions={{
//                     headerShown: false,
//                 }}
//                 initialRouteName="Change"
//             >
//                 <Tab.Screen
//                     name="Home"
//                     component={Home}

//                 />
//                 <Tab.Screen
//                     name="Markets"
//                     component={Market}
//                 />
//                 <Tab.Screen
//                     name="Change"
//                     component={Change}
//                 />
//                 <Tab.Screen
//                     name="Wallet"
//                     component={Wallet}
//                 />
//                 <Tab.Screen
//                     name="Profile"
//                     component={Profile}
//                 />
//             </Tab.Navigator>
//         </SafeAreaView>
//     );
// };



// export default TabStyle3;
