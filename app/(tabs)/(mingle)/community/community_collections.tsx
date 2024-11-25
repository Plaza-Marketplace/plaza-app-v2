import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CommunityProductImage from '@/components/Community/CommunityProductImage';
import { MOCK_COMMUNITY_PRODUCTS } from '@/mocks';
import Color from '@/constants/Color';

const community_collections = () => {
  const communityProducts = MOCK_COMMUNITY_PRODUCTS;

  const leftColumn = [];
  const rightColumn = [];

  for (let i = 0; i < communityProducts.length; i++) {
    if (i % 2 === 0) {
      leftColumn.push(communityProducts[i]);
    } else {
      rightColumn.push(communityProducts[i]);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.columnContainer}>
      <View style={styles.column}>
        {leftColumn.map((communityProduct) => (
          <CommunityProductImage communityProduct={communityProduct} />
        ))}
      </View>
      <View style={styles.column}>
        {rightColumn.map((communityProduct) => (
          <CommunityProductImage communityProduct={communityProduct} />
        ))}
      </View>
    </ScrollView>
  );
};

export default community_collections;

const styles = StyleSheet.create({
  columnContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: 8,
    gap: 8,
    backgroundColor: Color.SURFACE_PRIMARY,
  },
  column: {
    flex: 1,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
  },
  info: {
    backgroundColor: Color.SURFACE_PRIMARY,
    borderBottomWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
  },
});
