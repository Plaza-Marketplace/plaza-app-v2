import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import CommunityCard from '@/components/Community/CommunityCard';
import { MOCK_COMMUNITIES } from '@/mocks';
import useGetAssociatedCommunities from '@/hooks/useGetAssociatedCommunities';

const Communities = () => {
  const { data, error } = useGetAssociatedCommunities(1);
  return (
    <View style={styles.container}>
      {/* {MOCK_COMMUNITIES.map((community) => (
        <CommunityCard
          key={community.id}
          community={community}
          notificationsCount={Math.round(Math.random() * 150)}
        />
      ))} */}
      <Text>{JSON.stringify(data)}</Text>
      <Text>{JSON.stringify(error)}</Text>
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
