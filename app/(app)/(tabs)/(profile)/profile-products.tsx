import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Tabs } from 'react-native-collapsible-tab-view';
import ProductPreview from '@/components/ProductPreview';

const mocking = Array.from({ length: 10 });

const ProfileProducts = () => {
  const width = Dimensions.get('window').width;
  return (
    <Tabs.FlatList
      style={{ flex: 1 }}
      numColumns={3}
      data={mocking}
      renderItem={() => (
        <View
          style={{
            width: width / 2,
            height: width / 2,
            paddingHorizontal: 2,
            paddingTop: 10,
          }}
        >
          <ProductPreview />
        </View>
      )}
    />
  );
};

export default ProfileProducts;

const styles = StyleSheet.create({});
