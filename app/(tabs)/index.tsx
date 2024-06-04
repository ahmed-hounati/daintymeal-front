import ExploreHeader from '@/components/ExploreHeader';
import Listings from '@/components/Listings';
import Plats from '@/components/Plats';
import Restos from '@/components/Restos';
import { Stack } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';

const Page = () => {
  const [category, setCategory] = useState<string>('Tiny homes');

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 80 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginTop: 20 }}>
          <Restos />
        </View>
        <View style={{ marginTop: 20 }}>
          <Plats />
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;