import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MOCK_COMMUNITY_POSTS } from '@/mocks';
import PostCard from '@/components/PostCards/PostCard';
import { PostCardType } from '@/constants/Types';

const community_posts = () => {
  return (
    <ScrollView>
      {MOCK_COMMUNITY_POSTS.map((post, i) => (
        <PostCard
          id={i}
          username="username"
          date={post.timeCreated}
          postName={post.title}
          postDesc={post.description}
          rating={4.5}
          type={PostCardType.REVIEW}
          key={`post${i}`}
        />
      ))}
    </ScrollView>
  );
};

export default community_posts;

const styles = StyleSheet.create({});
