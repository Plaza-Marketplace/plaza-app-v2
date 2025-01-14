import { SectionList, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { router } from 'expo-router';
import BackHeader from '@/app/(app)/(tabs)/(inbox)/BackHeader';
import Spacing from '@/constants/Spacing';
import ActivityNote from '@/app/(app)/(tabs)/(inbox)/ActivityNote';
import { FlatList } from 'react-native-gesture-handler';
import CaptionText from '@/components/Texts/CaptionText';
import { Ionicons } from '@expo/vector-icons';
import Color from '@/constants/Color';
import { useGetConversationMembersByUserId } from '@/hooks/queries/useConversationMembers';
import { User } from '@/models/user';
import { AuthContext } from '@/contexts/AuthContext';
import { formatDatetime } from '@/utils/datetime';

const mockData = [1, 2, 3];

const MessageList = () => {
  const { user } = useContext(AuthContext);
  const { data: conversations, isLoading: conversationsLoading } = user
    ? useGetConversationMembersByUserId(user.id)
    : { data: undefined, isLoading: true };

  if (conversationsLoading) {
    <Text>Loading...</Text>;
  }
  return (
    <>
      <BackHeader name="Messages" />
      <View
        style={{ flex: 1, marginTop: Spacing.SPACING_2, position: 'relative' }}
      >
        <FlatList
          style={styles.list}
          data={conversations}
          keyExtractor={(item, index) => `${item.conversationId}-${index}`}
          renderItem={({ item }) => (
            <PressableOpacity
              style={{
                marginVertical: Spacing.SPACING_2,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                router.push({
                  pathname: '/message',
                  params: { username: 'William Zhong' },
                });
              }}
            >
              <ActivityNote name={item.user.username} note="Message" />
              <CaptionText>{formatDatetime(item.createdAt)}</CaptionText>
            </PressableOpacity>
          )}
        />

        <Text>{JSON.stringify(conversations)}</Text>
        <Text>{conversationsLoading}</Text>

        <PressableOpacity
          style={styles.addButton}
          onPress={() => router.push('/add-conversation')}
        >
          <Ionicons name="add" size={36} color="white" />
        </PressableOpacity>
      </View>
    </>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  followRequest: {
    width: '100%',
    paddingVertical: Spacing.SPACING_2,
    paddingHorizontal: Spacing.SPACING_3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Color.BORDER_TERTIARY,
  },
  list: {
    paddingHorizontal: Spacing.SPACING_3,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: Color.ICON_PRIMARY,
    padding: 10,
    borderRadius: 50,
  },
});
