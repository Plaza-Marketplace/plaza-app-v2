import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Spacing from '@/constants/Spacing';
import SearchBar from '@/components/SearchBar';
import Catalog from '@/components/Catalog';

const CatalogScreen = () => {
  const inset = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: inset.top }]}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <SearchBar
            placeholder="Search products"
            onChangeText={(text) => console.log(text)} // Placeholder for search functionality
          />
        </View>
      </View>

      <Catalog enabled />
    </View>
  );
};

export default CatalogScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    gap: 16,
  },

  searchContainer: {
    gap: 16,
    paddingTop: Spacing.SPACING_2,
    width: '100%',
  },
  searchBar: {
    paddingHorizontal: 16,
  },
});
