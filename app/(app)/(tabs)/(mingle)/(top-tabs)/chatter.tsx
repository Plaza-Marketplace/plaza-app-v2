import { View } from 'react-native';
import React from 'react';
import ChatterPostCard from '@/components/PostCards/ChatterPostCard';
import { useGetChatterPosts } from '@/hooks/queries/useCommunityPosts';

const Chatter = () => {
  const { data, error } = useGetChatterPosts();

  if (error) return null;

  const posts = data ?? [];

  return (
    <View>
      {posts.map((post) => (
        <ChatterPostCard key={post.id} communityPost={post} />
      ))}
    </View>
  );
};

export default Chatter;
