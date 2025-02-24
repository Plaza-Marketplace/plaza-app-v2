import React from 'react';
import ChatterPostCard from '@/components/PostCards/PostCard';
import { useGetChatterPosts } from '@/hooks/queries/useCommunityPosts';
import { ScrollView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { View } from 'react-native';
import Color from '@/constants/Color';

const Chatter = () => {
  const { data, error } = useGetChatterPosts();

  if (error) return null;

  const posts = data ?? [];

  return (
    <View style={{ flex: 1, backgroundColor: Color.SURFACE_PRIMARY }}>
      <ScrollView>
        {posts.map((post) => (
          <ChatterPostCard
            key={post.id}
            communityPost={post}
            onPress={() =>
              router.push({
                pathname: '/post-modal',
                params: { postId: post.id },
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Chatter;
