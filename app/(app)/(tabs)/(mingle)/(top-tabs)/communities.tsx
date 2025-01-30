import { StyleSheet, View, Text, ScrollView } from 'react-native';
import React from 'react';
import CommunityCard from '@/components/Community/CommunityCard';
import { useGetAssociatedCommunities } from '@/hooks/queries/useCommunity';
import { useAuth } from '@/contexts/AuthContext';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';

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
      <ScrollView contentContainerStyle={{ gap: Spacing.SPACING_3 }}>
        {data.map((community) => (
          <CommunityCard
            key={community.id}
            community={community}
            notificationsCount={Math.round(Math.random() * 150)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Communities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.SPACING_3,
    gap: 16,
    backgroundColor: Color.SURFACE_PRIMARY,
  },
});
