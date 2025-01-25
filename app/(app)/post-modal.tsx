import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useGetCommunityPost } from '@/hooks/queries/useCommunityPosts';
import PostCard from '@/components/PostCards/PostCard';
import PlazaHeader from '@/components/PlazaHeader';

const PostModal = () => {
  const params = useLocalSearchParams<{
    postId: string;
  }>();

  const postId = parseInt(params.postId);

  const { data: post, error } = useGetCommunityPost(postId);

  if (!params.postId || error) {
    router.navigate('/+not-found');
    return;
  }

  if (!post) {
    return null;
  }

  return (
    <View>
      <PlazaHeader name={post.community.name} />
      <PostCard communityPost={post} />
    </View>
  );
};

export default PostModal;

const styles = StyleSheet.create({});
