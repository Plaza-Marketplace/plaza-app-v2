import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import CommunityCard from '@/components/Community/CommunityCard';
import { MOCK_COMMUNITIES } from '@/mocks';
import {
  useGetAssociatedCommunities,
  useCreateCommunity,
} from '@/hooks/queries/useCommunity';

const Communities = () => {
  const { data, error, isPending } = useGetAssociatedCommunities(1);
  const { mutate } = useCreateCommunity();

  const testCreateCommunities = () => {
    for (const comm of MOCK_COMMUNITIES) {
      console.log(comm);
      mutate(comm);
    }
  };

  if (!data || isPending) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {data.map((community) => (
        <CommunityCard
          key={community.id}
          community={community}
          notificationsCount={Math.round(Math.random() * 150)}
        />
      ))}
      {/* <PressableOpacity onPress={() => testCreateCommunities()}>
        <Text>Press me to add some test communities</Text>
      </PressableOpacity> */}
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
