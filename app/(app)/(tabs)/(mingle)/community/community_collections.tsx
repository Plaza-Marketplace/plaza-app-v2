import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CommunityCollectionItemPost from '@/components/Community/CommunityCollectionItemPost';
import Color from '@/constants/Color';
import useGetCommunityCollectionItems from '@/hooks/queries/useGetCommunityCollectionItems';
import { useLocalSearchParams } from 'expo-router';
import Spacing from '@/constants/Spacing';

const community_collections = () => {
  const { communityId: id } = useLocalSearchParams<{ communityId: string }>();
  const communityId = parseInt(id);

  const { data: communityCollectionItems, error } =
    useGetCommunityCollectionItems(communityId);

  if (error) return <Text>{error.message}</Text>;

  if (!communityCollectionItems) return <Text>Loading...</Text>;

  const leftColumn = [];
  const rightColumn = [];

  for (let i = 0; i < communityCollectionItems.length; i++) {
    if (i % 2 === 0) {
      leftColumn.push(communityCollectionItems[i]);
    } else {
      rightColumn.push(communityCollectionItems[i]);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: Color.SURFACE_PRIMARY }}>
      <ScrollView contentContainerStyle={styles.columnContainer}>
        <View style={styles.column}>
          {leftColumn.map((communityCollectionItem, i) => (
            <CommunityCollectionItemPost
              communityCollectionItem={communityCollectionItem}
              key={`left${i}`}
            />
          ))}
        </View>
        <View style={styles.column}>
          {rightColumn.map((communityCollectionItem, i) => (
            <CommunityCollectionItemPost
              communityCollectionItem={communityCollectionItem}
              key={`right${i}`}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default community_collections;

const styles = StyleSheet.create({
  columnContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: Spacing.SPACING_2,
    gap: Spacing.SPACING_2,
    backgroundColor: Color.SURFACE_PRIMARY,
  },
  column: {
    flex: 1,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.SPACING_2,
  },
  info: {
    backgroundColor: Color.SURFACE_PRIMARY,
    borderBottomWidth: 1,
    borderColor: Color.BORDER_SECONDARY,
  },
});
