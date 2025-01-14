import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import CommunityCard from '@/components/Community/CommunityCard';
import { MOCK_COMMUNITIES } from '@/mocks';
import {
  useGetAssociatedCommunities,
  useCreateCommunity,
} from '@/hooks/queries/useCommunity';
import { useAuth } from '@/contexts/AuthContext';

const Communities = () => {
  const { user } = useAuth();
  const { data, error, isPending } = user
    ? useGetAssociatedCommunities(user.id)
    : { data: null, error: null, isPending: false };

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
