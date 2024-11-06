import { View, Text } from 'react-native';
import React from 'react';
import PostCard from '@/components/postcards/PostCard';
import { PostCardType } from '@/constants/Types';

const chatter = () => {
  return (
    <View>
      <PostCard
        username="username"
        date="date"
        postName="productName"
        postDesc="productDesc"
        rating={4.5}
        type={PostCardType.REVIEW}
      />
    </View>
  );
};

export default chatter;
