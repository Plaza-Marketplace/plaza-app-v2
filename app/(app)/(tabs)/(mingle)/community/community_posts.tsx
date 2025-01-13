import { ScrollView, StyleSheet, Text } from 'react-native';
import React from 'react';
import PostCard from '@/components/PostCards/PostCard';
import { useGetCommunityPosts } from '@/hooks/queries/useCommunityPosts';
import { router, useLocalSearchParams } from 'expo-router';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { FontAwesome6 } from '@expo/vector-icons';
import Color from '@/constants/Color';

const community_posts = () => {
  const { communityId } = useLocalSearchParams<{ communityId: string }>();
  const {
    data: communityPosts,
    error: postErrors,
    isLoading: postsLoading,
  } = useGetCommunityPosts(parseInt(communityId));
  if (postsLoading) return <Text>Loading...</Text>;
  if (!communityPosts || postErrors)
    return <Text>{`${JSON.stringify(communityPosts)}`}</Text>;
  return (
    <>
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
        <FontAwesome6 name="pen-to-square" size={24} color="white" />
      </PressableOpacity>
    </>
  );
};

export default community_posts;

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Color.ICON_PRIMARY,
    padding: 15,
    borderRadius: 50,
  },
});
