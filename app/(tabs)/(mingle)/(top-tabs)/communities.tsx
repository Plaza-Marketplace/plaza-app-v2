import { StyleSheet, View } from 'react-native';
import React from 'react';
import CommunityCard from '@/components/Community/CommunityCard';
import { MOCK_COMMUNITIES } from '@/mocks';

const Communities = () => {
  return (
    <View style={styles.container}>
      {MOCK_COMMUNITIES.map((community) => (
        <CommunityCard
          key={community.id}
          community={community}
          notificationsCount={Math.round(Math.random() * 150)}
        />
      ))}
    </View>
  );
};

export default Communities;

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    gap: 16,
  },
});
