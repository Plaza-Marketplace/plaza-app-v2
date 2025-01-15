import { View } from 'react-native';
import React from 'react';
import ChatterPostCard from '@/components/PostCards/PostCard';
import { useGetChatterPosts } from '@/hooks/queries/useCommunityPosts';
import { ScrollView } from 'react-native-gesture-handler';

const Chatter = () => {
  const { data, error } = useGetChatterPosts();

  if (error) return null;

  const posts = data ?? [];

  return (
    <ScrollView>
      {posts.map((post) => (
        <ChatterPostCard key={post.id} communityPost={post} />
      ))}
    </ScrollView>
  );
};

export default Chatter;
