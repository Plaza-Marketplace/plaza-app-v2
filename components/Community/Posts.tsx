import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import PostCard from '@/components/PostCards/PostCard';
import { useGetChatterPostsByCommunity } from '@/hooks/queries/useCommunityPosts';
import { router } from 'expo-router';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { FontAwesome6 } from '@expo/vector-icons';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { Tabs } from 'react-native-collapsible-tab-view';

interface PostsProps {
  communityId: Id;
}

const Posts: FC<PostsProps> = ({ communityId }) => {
  const {
    data: communityPosts,
    error: postErrors,
    isLoading: postsLoading,
  } = useGetChatterPostsByCommunity(communityId);
  if (postsLoading) return <Text>Loading...</Text>;
  if (!communityPosts || postErrors)
    return <Text>{`${JSON.stringify(communityPosts)}`}</Text>;
  return (
    <View style={{ flex: 1, backgroundColor: Color.SURFACE_PRIMARY }}>
      <Tabs.FlatList
        data={communityPosts}
        renderItem={({ item }) => <PostCard communityPost={item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      <PressableOpacity
        style={styles.addButton}
        onPress={() =>
          router.navigate({
            pathname: '/add-post-modal',
            params: { communityId: communityId },
          })
        }
      >
        <FontAwesome6 name="pen-to-square" size={24} color={Color.GREY_100} />
      </PressableOpacity>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: Spacing.SPACING_4,
    right: Spacing.SPACING_4,
    backgroundColor: Color.ICON_PRIMARY,
    padding: Spacing.SPACING_2,
    borderRadius: Spacing.SPACING_2XL,
  },
});
