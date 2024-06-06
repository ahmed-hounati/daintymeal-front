import ExploreHeader from '@/components/ExploreHeader';
import Plats from '@/components/Plats';
import Restos from '@/components/Restos';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { View, FlatList } from 'react-native';

const Page = () => {
  const [category, setCategory] = useState<string>(''); // State to hold the selected category

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged}  />,
        }}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          data={[{ key: 'Restos' }, { key: 'Plats' }]}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              {item.key === 'Restos' && <Restos />}
              {item.key === 'Plats' && <Plats category={category} />}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Page;
