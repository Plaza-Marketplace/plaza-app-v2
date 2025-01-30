import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PostCard from '@/components/PostCards/PostCard';
import { useGetChatterPostsByCommunity } from '@/hooks/queries/useCommunityPosts';
import { router, useLocalSearchParams } from 'expo-router';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { FontAwesome6 } from '@expo/vector-icons';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';

const community_posts = () => {
  const { communityId } = useLocalSearchParams<{ communityId: string }>();
  const {
    data: communityPosts,
    error: postErrors,
    isLoading: postsLoading,
  } = useGetChatterPostsByCommunity(parseInt(communityId));
  if (postsLoading) return <Text>Loading...</Text>;
  if (!communityPosts || postErrors)
    return <Text>{`${JSON.stringify(communityPosts)}`}</Text>;
  return (
    <View style={{ flex: 1, backgroundColor: Color.SURFACE_PRIMARY }}>
      <ScrollView>
        {communityPosts.map((post, i) => (
          <PostCard communityPost={post} key={`post${i}`} />
        ))}
      </ScrollView>
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

export default community_posts;

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
