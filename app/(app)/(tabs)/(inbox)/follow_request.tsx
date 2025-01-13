import ActivityNote from '@/app/(app)/(tabs)/(inbox)/ActivityNote';
import BackHeader from '@/app/(app)/(tabs)/(inbox)/BackHeader';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import Spacing from '@/constants/Spacing';
import { AuthContext } from '@/contexts/AuthContext';
import {
  useGetFollowRequestsByRecipient,
  useGetFollowRequestsBySender,
} from '@/hooks/queries/useFollowRequest';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const mockData = [1, 2, 3];

const FollowRequest = () => {
  const { session } = useContext(AuthContext);
  if (!session) return null;
  const { data: user, isLoading: isUserLoading } = useGetUserByAuthId(
    session.user.id
  );
  if (isUserLoading || !user) return null;
  const { data: requests, isLoading: isRequestsLoading } =
    useGetFollowRequestsBySender(user.id);
  return (
    <>
      <BackHeader name="Follow Request" />
      <View style={{ flex: 1, marginTop: Spacing.SPACING_2 }}>
        <FlatList
          style={styles.list}
          data={mockData}
          keyExtractor={(item, index) => `${item + index}`}
          renderItem={({ item }) => (
            <View
              style={{
                marginVertical: Spacing.SPACING_2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <ActivityNote name="William Zhong" note="asdlfkjhasdlft" />
              <View style={styles.options}>
                <PressableOpacity>
                  <Ionicons name="checkmark" size={24} color="black" />
                </PressableOpacity>
                <PressableOpacity style={{ marginLeft: Spacing.SPACING_2 }}>
                  <Ionicons name="close" size={24} color="black" />
                </PressableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <Text>{JSON.stringify(requests)}</Text>
    </>
  );
};

export default FollowRequest;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: Spacing.SPACING_3,
  },
  options: {
    flexDirection: 'row',
  },
});
