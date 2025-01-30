import ActivityNote from '@/app/(app)/(tabs)/(inbox)/ActivityNote';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import PlazaHeader from '@/components/PlazaHeader';
import { BackButton } from '@/components/PlazaIcons/ActionIcons';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { AuthContext } from '@/contexts/AuthContext';
import { useCreateFollow } from '@/hooks/queries/useFollow';
import {
  useCreateFollowRequest,
  useDeleteFollowRequest,
  useGetFollowRequestsByRecipient,
} from '@/hooks/queries/useFollowRequest';
import { Ionicons } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const FollowRequest = () => {
  const { user } = useContext(AuthContext);
  const { data: requests, isLoading: isRequestsLoading } = user
    ? useGetFollowRequestsByRecipient(user.id)
    : { data: null, isLoading: false };

  const { mutate: acceptRequest } = useCreateFollow();
  const { mutate: deleteRequest } = useDeleteFollowRequest();
  const { mutate: createRequest } = useCreateFollowRequest();

  if (!requests || isRequestsLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <>
      <PlazaHeader
        name="Follow Requests"
        leftIcon={<BackButton color={Color.GREY_500} />}
      />
      <View style={{ flex: 1, marginTop: Spacing.SPACING_2 }}>
        <FlatList
          style={styles.list}
          data={requests}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <View
              style={{
                marginVertical: Spacing.SPACING_2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <ActivityNote
                name={`${item.sender.firstName} ${item.sender.lastName}`}
                note={item.sender.username}
              />
              <View style={styles.options}>
                <PressableOpacity
                  onPress={() => {
                    acceptRequest({
                      sourceId: item.sender.id,
                      destId: item.recipient.id,
                    });
                    deleteRequest(item.id);
                  }}
                >
                  <Ionicons name="checkmark" size={24} color={Color.GREY_500} />
                </PressableOpacity>
                <PressableOpacity
                  style={{ marginLeft: Spacing.SPACING_2 }}
                  onPress={() => {
                    deleteRequest(item.id);
                  }}
                >
                  <Ionicons name="close" size={24} color={Color.GREY_500} />
                </PressableOpacity>
              </View>
            </View>
          )}
        />
      </View>
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
