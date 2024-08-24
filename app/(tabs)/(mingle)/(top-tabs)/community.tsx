import { View, Text } from 'react-native';
import React from 'react';
import CommunityHeader from '@/components/CommunityHeader';

const community = () => {
  return (
    <View>
      <CommunityHeader
        name="Community"
        memberCount={100}
        description="Description"
        icon="icon"
        background="background"
      />
    </View>
  );
};

export default community;
