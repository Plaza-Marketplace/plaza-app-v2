import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusHeader from '@/components/FocusHeader';
import { router, useLocalSearchParams } from 'expo-router';
import { useGetCommunityPost } from '@/hooks/queries/useCommunityPosts';
import PostCard from '@/components/PostCards/PostCard';

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
    <SafeAreaView>
      <FocusHeader name={post.community.name} />
      <PostCard communityPost={post} />
    </SafeAreaView>
  );
};

export default PostModal;

const styles = StyleSheet.create({});
